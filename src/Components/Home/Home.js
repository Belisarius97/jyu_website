import React from 'react';
import profPic from '../../Assets/profpic1.jpg'

const imgDiam = "250"

const bio = `I'm fond of curling up with tea and a good book, going on a 
  photography adventure, and coding up side projects. Lover of literature,
  policy, technology, music, and pretty things generally. I code, write a 
  little, read a lot, dance far more than I should.`

const Home = () => (
  <home className="transition-block">
    <p>Hi.</p>
    <div>
      <img className="profilePic" src={profPic} alt={"ProfilePicture"} height={imgDiam} width={imgDiam} />
    </div>
    <br/>
    <p>
      {bio}
    </p>
    <br/>
    <p>Fun fact: I once walked the&nbsp;
    <a href="https://en.wikipedia.org/wiki/Camino_de_Santiago">Camino de Santiago</a> 
      &nbsp;- just under 1000km in total. It was apparently meaningful enough 
      for me to put it here.
    </p>
    <br/>
    <p>You can find my code <a href="https://github.com/Belisarius97">here</a>.</p>
  </home>
)
    
export default Home;
