<template>
<div>
      <header id="topHeader">The Team</header>
      <p id="topParagraph">We are a close team of dedicated developers and designers based out of Seattle. We are passionate about solving problems for people by providing them with applications they can use in their daily lives.</p>
      <div id="row1">
        <div className="profileCards">
          <img src="https://scontent.ford1-1.fna.fbcdn.net/v/t1.0-9/20258149_1762883797059979_2271180749826725740_n.jpg?oh=862e49b11d09b483ee51d9ea6fb21226&oe=5B0CDCE7"/>
          <header>Aneesh Vempaty</header>
          <p>Developer</p>
        </div>
        <div className="profileCards">
          <img src="https://scontent.ford1-1.fna.fbcdn.net/v/t1.0-0/p206x206/13432372_10201768002359361_1644264331503287404_n.jpg?oh=0cf93b63a70e3cc89cbd56d8dd31adb7&oe=5B174AF9"/>
          <header>Pranav Shekar</header>
          <p>Backend Developer</p>
        </div>
        <div className="profileCards">
          <img src="https://scontent.ford1-1.fna.fbcdn.net/v/t1.0-9/10730970_996434900389560_6144339044351560451_n.jpg?oh=81c2fb3df93cf3425a4bee241643bf21&oe=5ADADF22"/>
          <header>Vincent Jiang</header>
          <p>Frontend Developer</p>
        </div>
        <div className="profileCards">
          <img src="https://scontent.ford1-1.fna.fbcdn.net/v/t1.0-0/p206x206/19511049_10209555918996490_1540856195408613407_n.jpg?oh=aa840e32639eb1acf037c85c62e58702&oe=5B1C48FF"/>
          <header>Marlo Delatorre</header>
          <p>Developer</p>
        </div>
        <div className="profileCards">
          <img src="https://scontent.ford1-1.fna.fbcdn.net/v/t1.0-0/p206x206/17264190_10208848380102679_7872838750100870624_n.jpg?oh=5c00292d4e4de0cdbd640498c09441dc&oe=5B1E3666"/>
          <header>Peter Farmer</header>
          <p>Developer</p>
        </div>
      </div>
    </div>
</template>

<script>
export default {
    name: 'team',
    components: {

    }
}
</script>

<style scoped>
  header {
    font-size: 18pt;
    font-weight: bold;
    color: #D34084;
    margin-top: 10px;
  }
  p {
    font-size: 14pt;
    font-weight: lighter;
    color: #D34084;
    margin-top: 0px;
  }
  img {
    width: 350px;
    height: 350px;
  }
  #topHeader {
    font-size: 30pt;
    font-weight: bold;
    color: #D34084;
    margin-bottom: 50px;
    padding-left: 6%;
  }
  #topParagraph {
    font-size: 13pt;
    font-weight: lighter;
    color: #D34084;
    letter-spacing: 2px;
    margin-bottom: 50px;
    padding-left: 6%;
    padding-right: 6%;
  }

  .profileCards{
    display: inline-block;
    text-align: center;
    width: 33%;
    margin-top: 20px;
    margin-bottom: 20px;
  }

  #row1 {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
  }
</style>
