<template>
  <div class="list" id="myList">
    <canvas id="myCanvas" width="100%"></canvas>
    <div class="myform">
      <h3>{{ msg  }}</h3>
      <el-input v-model="name" placeholder="你的名字" class="winput"></el-input>
      <el-switch v-model="isOrder" active-color="#dcdfe6" inactive-color="#13ce66" active-text="是否点餐" class="g-weitch">
      </el-switch>
      <el-button type="primary" @click="sub" class="btn">提交</el-button>
    </div>
  </div>
</template>
<script type="text/javascript">
window.onload = function() {
  var w = window.innerWidth;
  var h = window.innerHeight;
  var canvas = document.getElementById('myCanvas');
  canvas.width = w;
  canvas.height = h;

  var ctx = canvas.getContext('2d');
  var zhongX = 750; //画布中点横坐标(鼠标位置x)
  var zhongY = 400; //画布中点纵坐标(鼠标位置y)
  //随机函数
  function randomNum(m, n) {
    return Math.floor(Math.random() * (n - m + 1) + m);
  }

  //创建一个小球类
  function Ball() {
    //随机一个小球半径
    this.r = randomNum(1, 2);
    //随机颜色
    var color = 'rgb(' + randomNum(0, 255) + ',' + randomNum(0, 255) + ',' + randomNum(0, 255) + ')';
    //随机一个小球的颜色
    this.color = color;
    //随机一个小球x轴的位置和y轴的位置
    this.x = randomNum(this.r, canvas.width - this.r);
    this.y = randomNum(this.r, canvas.height - this.r);
    //随机小球移动速度和方向
    this.speedX = randomNum(1, 3) * (randomNum(0, 1) ? 1 : -1);
    this.speedY = randomNum(1, 3) * (randomNum(0, 1) ? 1 : -1);
  }
  //小球移动
  Ball.prototype.move = function() {
    this.x += this.speedX;
    this.y += this.speedY;
    //小球碰到左边界的处理 反弹
    if (this.x <= this.r) {
      this.x = this.r;
      //反弹
      this.speedX *= -1;
    }
    //小球碰到右边界的处理 反弹
    if (this.x >= canvas.width - this.r) {
      this.x = canvas.width - this.r;
      //反弹
      this.speedX *= -1;
    }
    //小球碰到上边界的处理 反弹
    if (this.y <= this.r) {
      this.y = this.r;
      //反弹
      this.speedY *= -1;
    }
    //小球碰到下边界的处理 反弹
    if (this.y >= canvas.height - this.r) {
      this.y = canvas.height - this.r;
      //反弹
      this.speedY *= -1;
    }
  }
  //画小球
  Ball.prototype.draw = function() {
    //开始绘制
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2, false);
    ctx.fillStyle = this.color;
    ctx.fill();
  }
  //创建小球对象
  var balls = []; //存储所有的小球对象
  var arr = []; //储存一定范围内的小球
  for (var i = 0; i < 450; i++) {
    var ball = new Ball();
    balls.push(ball);
  }
  setInterval(function() {
    arr = [];
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    for (var i = 0; i < balls.length; i++) {
      //小球移动
      balls[i].move();
      //绘制小球
      balls[i].draw();
      if (ballLianXianMa(balls[i])) {
        arr.push(balls[i]);
      }
    }
    //绘制范围内并且符合条件小球之间的两两连线(画直线)
    for (var i = 0; i < arr.length; i++) {
      for (var j = 0; j < arr.length; j++) {
        if (ballAndBallDis(arr[i], arr[j]) < 80 &&
          ballAndBallDis(arr[i], arr[j]) > 40) {
          ctx.beginPath();
          ctx.moveTo(arr[i].x, arr[i].y);
          ctx.lineTo(arr[j].x, arr[j].y);
          ctx.strokeStyle = 'rgb(' + randomNum(0, 255) + ',' + randomNum(0, 255) + ',' + randomNum(0, 255) + ')';
          ctx.stroke();
        }
      }
    }
  }, 80);
  //判断临界值,不允许连线范围超出画布
  canvas.onmousemove = function() {
    if (event.offsetX <= 200) {
      zhongX = 200;
    } else if (event.offsetX >= 1300) {
      zhongX = 1300;
    } else {
      zhongX = event.offsetX;
    }
    if (event.offsetY <= 200) {
      zhongY = 200;
    } else if (event.offsetY >= 600) {
      zhongY = 600;
    } else {
      zhongY = event.offsetY;
    }
  }
  //判断小球是否在需要连线的范围内的函数
  function ballLianXianMa(obj) {
    var disx = Math.abs(zhongX - obj.x);
    var disy = Math.abs(zhongY - obj.y);
    if (Math.sqrt(disx * disx + disy * disy) <= 200 - obj.r) {
      return true;
    }
    return false;
  }
  //计算两个小球之间的距离函数
  function ballAndBallDis(obj1, obj2) {
    var disx = Math.abs(obj1.x - obj2.x); //水平距离
    var disy = Math.abs(obj1.y - obj2.y); //垂直距离
    return Math.sqrt(disx * disx + disy * disy);
  }
}
export default {
  name: 'Index',
  data() {
    return {
      msg: '点餐小系统',
      name: '',
      isOrder: false
    }
  },
  methods: {
    sub() {
      console.log(this.name)
      console.log(this.isOrder)
    }
  }

};

</script>
<style type="text/css">
* {
  margin: 0;
  padding: 0;
}

#myCanvas {
  background-color: black;
  display: block;
  margin: 0 auto;
  position: absolute;
  top: 0;
  left: 0;
}

h3 {
  font-size: 24px;
  font-weight: normal;
  text-align: center;
  padding: 40px 0 15%;
}

.list {
  width: 100%;
  height: 100%;
  position: relative;
}

.warp {
  width: 80%;
  position: relative;
  margin: 0 auto;
}

.myform {
  width: 600px;
  height: 400px;
  position: absolute;
  left: 50%;
  top: 50%;
  margin: 200px 0 0 -250px;
  background: #fff;
  border: 1px solid #fff;
  border-radius: 6px;
  padding: 20px;
}

.g-weitch {
  height: 40px;
  position: absolute;
  left: 60%;
}

.winput {

  width: 50%;
  display: inline-block;
  text-align: left;
  float: left;
}

.btn {
  position: absolute;
  right: 40px;
}

</style>
