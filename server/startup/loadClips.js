Meteor.startup(function(){

  // if(Clips.find().count() === 0){
  //   var clips = [
  //     {
	// 			id:'a2b7b231-ddb5-49ee-91ce-f0c23cc94fa0',
	// 			title:'Maher Zain - Baraka Allahu Lakuma',
  //       category:'music',
	// 			description: "Awakening Records is a subsidiary of the UK-based Awakening Worldwide that has operational offices in both United States of America (USA) and Egypt. Awakening Records currently represents five artists: Maher Zain (Sweden), Hamza Namira (Egypt), Mesut Kurtis(Macedonia), Raef (USA), and Harris J (UK). (Previously Sami Yusuf & Irfan Makki among others).",
	// 			year:'2015'
	// 		},
  //     {
	// 			id:'f8d683b1-ed3e-47f9-9469-13ea03431325',
	// 			title:'Raisa - Jatuh Hati (Music Cover In Movie)',
  //       category:'music',
	// 			description: "Even though it’s Valentine but maybe not all of us are able to breathe the lovely atmosphere in the air. Maybe not all of us have that somebody, the one that our heart yearn for, to add peace, to subtract our sorrow and to multiply joy in our life through their presence. Maybe just perhaps, our great love is never returned. We think this is the right song to sing for those kind of times. The time, though it’s Valentine, but cupid runs out of arrows and only shoots one person instead of two.",
	// 			year:'2015'
	// 		},
  //     {
	// 			id:'50dac069-2d3d-4c44-a136-7a322913605d',
	// 			title:'Evolution of Beyoncé - Pentatonix',
	// 			category:'music',
	// 			description:"Arrangement by Pentatonix. Recorded by Ben Bram http://www.thebenbram.com/. Filmed by Ryan Parma (twitter: @RyanParma). Mixed by Ed Boyer http://www.edboyeracappella.com/. Recorded and filmed at Endless Noise. http://www.endlessnoise.com (twitter: @endlessnoise)",
	// 			year:'2015'
	// 		},
	// 		{
	// 			id:'af1fbea7-0ee0-47bb-bfe7-5ae040b8d971',
	// 			title:'Maroon 5 - Sugar',
	// 			category:'music',
	// 			description: "Music video by Maroon 5 performing Sugar. (C) 2015 Interscope Records",
	// 			year:'2015'
	// 		},
	// 		{
	// 			id:'2d85af43-4d63-44f3-bc38-7a414386058e',
	// 			title:"Pat Metheny - That's The Way I Always Heard It Should Be (Carly Simon)",
	// 			category:'music',
	// 			description: "After nearly 40 recordings under his own name, this is the first Pat Metheny album where there is not a single Metheny composition represented. This is a personal view of ten classic songs, some very well known, some less so, filtered through the harmonic and melodic ideology of a modern master with a most individual approach.",
	// 			year:'2010'
	// 		},
	// 		{
	// 			id:'1096ba51-64d1-48f7-9b7e-2c92a65b9189',
	// 			title:"BIGBANG - LOSER M/V",
  //       category:'music',
	// 			description: "The small rope tattoo on the side of his face can mean that even though he's the leader, some of his actions are limited (example: having a personal/private life, the constant pressure and the responsibility of leading a group) and he cannot go too far away from his 'current location' (the rope is keeping him in place). Also, the 'truth+dare' writing on his neck can mean that he cannot simply just walk away from his responsibilities and hang himself when he's at his lowest so even in his darkest days, he needs to carry on because we and his members need him. So yeah, he's rich and famous and he has gotten everything but at the end of the day, even with all that, he's still alone... He has lost his life due to fame so he's a loser.",
	// 			year:'2014'
	// 		},
  //     {
	// 			id:'13f69084-d079-4732-b3b1-80ab88cece8b',
	// 			title:'Maher Zain - Paradise',
  //       category:'music',
	// 			description: "Maher Zain - Paradise | Official Music video from 'Forgive Me' album.",
	// 			year:'2015'
	// 		},
  //     {
	// 			id:'796824c2-1d35-4d31-9284-9d73d24a0dd3',
	// 			title:'twenty one pilots: Stressed Out',
  //       category:'music',
	// 			description: "We used to play pretend, give each other different names, We would build a rocket ship and then we’d fly it far away, Used to dream of outer space but now they’re laughing at our face, Saying, “wake up, you need to make money.",
	// 			year:'2014'
	// 		},
	// 		{
	// 			id:'018b3f55-fb42-4f01-847b-055a89ab2ae9',
	// 			title:'UNIC ft Simfoni - Pesona Ramadhan',
  //       category:'music',
	// 			description: "Official Music Video 'Pesona Ramadhan' Ramadhan datang lagi Bertandang di hati Dengan wajah yang indah Tanda bermula pesta ibadah",
	// 			year:'2015'
	// 		},
	// 		{
	// 			id:'13855293-0280-4d54-a116-fb8173d07c87',
	// 			title:'Wiz Khalifa - See You Again ft. Charlie Puth',
  //       category:'music',
	// 			description: "What a beautiful song with a great meaning. I'm sure that Wiz and Charlie worked really hard on this. They are an incredibly talented artists!",
	// 			year:'2015'
	// 		},
  //     {
	// 			id:'6457947e-6f4e-4a1d-bd7d-0248e8b78c55',
	// 			title:'Amy Cuddy: Your body language shapes who you are',
  //       category:'talk',
	// 			description: "Body language affects how others see us, but it may also change how we see ourselves. Social psychologist Amy Cuddy shows how 'power posing' -- standing in a posture of confidence, even when we don't feel confident -- can affect testosterone and cortisol levels in the brain, and might even have an impact on our chances for success.",
	// 	    year:'2014'
	// 		},
  //     {
	// 			id:'d1088b87-6b1d-453d-8bc9-5e5e451cb1c0',
	// 			title:'Andrew Solomon: Love, no matter what',
  //       category:'talk',
	// 			description: "What is it like to raise a child who's different from you in some fundamental way (like a prodigy, or a differently abled kid, or a criminal)? In this quietly moving talk, writer Andrew Solomon shares what he learned from talking to dozens of parents -- asking them: What's the line between unconditional love and unconditional acceptance?",
	// 	    year:'2013'
	// 		},
  //     {
	// 			id:'5988b257-d538-48a1-aabb-b83524d4d561',
	// 			title:'Tony Robbins: Why we do what we do',
  //       category:'talk',
	// 			description: 'Tony Robbins discusses the "invisible forces" that make us do what we do -- and high-fives Al Gore in the front row.',
	// 	    year:'2007'
	// 		},
  //     {
	// 			id:'33d221e7-8063-4206-8808-c2437e611a18',
	// 			title:'Angela Lee Duckworth: The key to success? Grit',
  //       category:'talk',
	// 			description: 'Leaving a high-flying job in consulting, Angela Lee Duckworth took a job teaching math to seventh graders in a New York public school. She quickly realized that IQ wasnt the only thing separating the successful students from those who struggled. Here, she explains her theory of "grit" as a predictor of success.',
	// 	    year:'2014'
	// 		},
  //     {
	// 			id:'8a8b441c-7da4-408b-b33b-e16dc94d657f',
	// 			title:'How algorithms shape our world - Kevin Slavin',
  //       category:'talk',
	// 			description: "Kevin Slavin argues that we're living in a world designed for -- and increasingly controlled by -- algorithms. In this riveting talk from TEDGlobal, he shows how these complex computer programs determine espionage tactics, stock prices, movie scripts, and architecture. Slavin also warns that we are writing code we can't understand with implications we can't control.",
	// 	    year:'2012'
	// 		},
  //     {
	// 			id:'dbdeadd7-343c-46b5-97dc-15f8757443e9',
	// 			title:'Simon Anholt: Which country does the most good for the world?',
  //       category:'talk',
	// 			description: "It's an unexpected side effect of globalization: problems that once would have stayed local—say, a bank lending out too much money—now have consequences worldwide. But still, countries operate independently, as if alone on the planet. Policy advisor Simon Anholt has dreamed up an unusual scale to get governments thinking outwardly: The Good Country Index. In a riveting and funny talk, he answers the question, Which country does the most good? The answer may surprise you (especially if you live in the US or China).",
	// 	    year:'2014'
	// 		},
  //     {
	// 			id:'871860e7-3a74-42a4-8692-071d84699a5c',
	// 			title:'Hyeonseo Lee: My escape from North Korea',
  //       category:'talk',
	// 			description: '',
	// 	    year:''
	// 		},
  //     {
	// 			id:'61df444b-294e-47b8-a0c2-fff606d27882',
	// 			title:'Hyeonseo Lee: My escape from North Korea',
  //       category:'talk',
	// 			description: "As a child growing up in North Korea, Hyeonseo Lee thought her country was the best on the planet. It wasn't until the famine of the 90s that she began to wonder. She escaped the country at 14, to begin a life in hiding, as a refugee in China. Hers is a harrowing, personal tale of survival and hope -- and a powerful reminder of those who face constant danger, even when the border is far behind.",
	// 	    year:'2013'
	// 		},
  //     {
	// 			id:'b957d1b9-e95e-469e-b689-ba665f45b21c',
	// 			title:'Sting: How I started writing songs again',
  //       category:'talk',
	// 			description: "Sting's early life was dominated by a shipyard—and he dreamed of nothing more than escaping the industrial drudgery. But after a nasty bout of writer's block that stretched on for years, Sting found himself channeling the stories of the shipyard workers he knew in his youth for song material. In a lyrical, confessional talk, Sting treats us to songs from his upcoming musical, and to an encore of Message in a Bottle.",
	// 	    year:'2014'
	// 		},
  //     {
	// 			id:'0c8cdec2-9a0e-4673-b6e7-bfff805f7707',
	// 			title:'Malcolm Gladwell: The unheard story of David and Goliath',
  //       category:'talk',
	// 			description: "It's a classic underdog tale: David, a young shepherd armed only with a sling, beats Goliath, the mighty warrior. The story has transcended its biblical origins to become a common shorthand for unlikely victory. But, asks Malcolm Gladwell, is that really what the David and Goliath story is about?",
	// 	    year:'2013'
	// 		},
  //     {
	// 			id:'871860e7-3a74-42a4-8692-071d84699a5c',
	// 			title:'Sophie Scott: Why we laugh',
  //       category:'talk',
	// 			description: "Did you know that you're 13 times more likely to laugh if you're with somebody else than if you're alone? Cognitive neuroscientist Sophie Scott shares this and other surprising facts about laughter in this fast-paced, action-packed and, yes, hilarious dash through the science of the topic.",
	// 	    year:'2015'
	// 		}
  //   ];
  //
  //   for(var i=0; i<clips.length; i++){
  //     Clips.insert(clips[i]);
  //   }
  //
  // }

});
