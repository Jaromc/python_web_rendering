new Vue({
   el: '#app',
   data: {
      canvas: null,
      x: 0,
      y: 0
   },
   created() {
      //starts the refresh loop
      this.refreshData();
   },
   mounted() {
      var c = document.getElementById("canvas");
      this.canvas = c.getContext('2d');
   },
   methods: {
      refreshData() {
            //calls the vue servers '/' method to fetch data
            Vue.http.get('http://127.0.0.1:7777').then(res => {
               //data is returned in json format
               this.x = res.body.data.x;
               this.y = res.body.data.y;
               //draw a new line to the canvas
               if (this.canvas != null) {
                  this.drawLine(this.x, this.y, this.x + 20, this.y + 20);
               }
            }, err => {
               console.log(err);
            }).then(() => {
               //refresh in 1sec
               setTimeout(this.refreshData, 1000);
            });
      },
      //clear the canvas and draw a new line
      drawLine(x1, y1, x2, y2) {
         let ctx = this.canvas;
         ctx.fillStyle = "rgba(0, 0, 0, 0)";
         ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
         ctx.beginPath();
         ctx.strokeStyle = 'black';
         ctx.lineWidth = 1;
         ctx.moveTo(x1, y1);
         ctx.lineTo(x2, y2);
         ctx.stroke();
         ctx.closePath();
         }
   }
})