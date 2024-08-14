import { useEffect } from "react"

export default function GameViewport() {
  useEffect(() => {
    let canvas = document.getElementById("game");
    canvas.width = document.documentElement.clientWidth;
    canvas.height = document.documentElement.clientHeight;
    let ctx = canvas.getContext('2d');
    loadOver(ctx, function() {
      loadRuntime(ctx);
      loadHooks(canvas);
    });
  })
  return (
    <canvas id="game" width="800" height="600"></canvas>
  )
}

let connectCount = 0;
function loadOver(ctx, callback) {
  fetch('http://localhost:3000/api', {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      type: "load_over",
      canvas_width: ctx.canvas.width,
      canvas_height: ctx.canvas.height
    })
  }).then(function(res) {
    if (res.status === 200) {
      callback(ctx);
      console.log("Server running and connected");
    } 
    else if (res.status === 423) {
      console.log("Server is already running. Skip loading process.");
      callback(ctx);
    } else {
      console.log("Server is not alive. Trying to reconnect...");
      if (connectCount < 5) {
        connectCount++;
        setTimeout(loadOver, 5000, ctx);
      } else {
        console.log("Server is not alive. Please try again later.");
      }
    }
  });
}

function loadRuntime(ctx) {
  const event_source = new EventSource('http://localhost:3000/update-api');
  event_source.addEventListener('open', function(_) {
    console.log("Event Server connected");
  });
  event_source.addEventListener('message', function(e) {
    console.log("Receive message: ", e.data);
    let data = JSON.parse(e.data);
    switch(data.type) {
      case "update":
        for (let d of data.body)
          draw(ctx, d);
        break;
      case "clear":
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        break;
      default:
        // Other type of runtime messages
        break;
    }
  })
}

function loadHooks(cvs) {
  ['click', 'mouseup', 'mousedown', 'mousemove'].map(function(type) {
    cvs.addEventListener(type, function(e) {
      fetch('http://localhost:3000/event-api', {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          id: 0,
          type: type,
          x: e.clientX,
          y: e.clientY
        })
      });
    });
  });
  ['keydown', 'keyup'].map(function(type) {
    document.addEventListener(type, function(e) {
      fetch('http://localhost:3000/event-api', {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          id: 1,
          type: type,
          key: e.key
        })
      });
    });
  });
}

function draw(ctx, data) {
  switch (data.command) {
    case "color":
      ctx.fillStyle = data.arg;
      ctx.fillRect(data.x, data.y, data.width, data.height);
      break;
    case "image":
      let arg = data.arg
      ctx.drawImage(
        arg.url, 
        arg.sx, 
        arg.sy, 
        arg.width, 
        arg.height, 
        data.x, 
        data.y, 
        data.width, 
        data.height);
      ctx.translate(data.x + data.width / 2, data.y + data.height / 2);
      ctx.scale(arg.scaleX, arg.scaleY);
      ctx.translate(-data.x - data.width / 2, -data.y - data.height / 2);
  }
}
