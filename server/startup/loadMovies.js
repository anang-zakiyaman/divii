Meteor.startup(function(){

  // if(Movies.find().count() === 0){
  //   var movies = [
  //     {
	// 			id:'50dac069-2d3d-4c44-a136-7a322913605d',
	// 			title:'The Gambler',
	// 			duration:'111',
	// 			director:'Rupert Wyatt',
	// 			actors:[
	// 				{name:'Mark Wahlberg',character:'Jim Bennett'},
	// 				{name:'Jessica Lange',character:'Roberta'},
	// 				{name:'John Goodman',character:'Frank'},
	// 				{name:'Brie Larson',character:'Amy Phillips'}
	// 			],
	// 			synopsis:"Jim Bennett is a risk taker. Both an English professor and a high-stakes gambler, Bennett bets it all when he borrows from a gangster and offers his own life as collateral. Always one step ahead, Bennett pits his creditor against the operator of a gambling ring and leaves his dysfunctional relationship with his wealthy mother in his wake. He plays both sides, immersing himself in an illicit, underground world while garnering the attention of Frank, a loan shark with a paternal interest in Bennett's future. As his relationship with a student deepens, Bennett must take the ultimate risk for a second chance...",
	// 			year:'2014',
	// 			genres:['crime','drama'],
	// 			size:{width:'854', height:'480'}
	// 		},
	// 		{
	// 			id:'af1fbea7-0ee0-47bb-bfe7-5ae040b8d971',
	// 			title:'Eat',
	// 			duration:'92',
	// 			director:'Jimmy Weber',
	// 			actors:[
	// 				{name:'Nate Bakke',character:'Porn Producer #1'},
	// 				{name:'Elena Chin',character:'Club Patron'},
	// 				{name:'Robyn Ashley Dennis',character:'Nurse'},
	// 				{name:'Mindy Faulkner',character:'Girl at Audition'}
	// 			],
	// 			synopsis:"Novella McClure is like most struggling actresses in Los Angeles: she's in her early 30s, her fake name sounded cooler ten years ago, and she hasn't landed a role in three years. To top it all off, she's developed a disturbing habit of eating her own flesh. Novella desperately tries to hide her strange condition from her motherly landlord, Eesha, and somewhat psychopathic best friend, Candice, but her body and mind continue to deteriorate in the depressing world of failed auditions and sketchy night clubs. Can a romantic relationship with her psychiatrist prevent her from self destruction? Or will her fatal habit continue to eat away at her?",
	// 			year:'2014',
	// 			genres:['horror','drama'],
	// 			size:{width:'640', height:'360'}
	// 		},
	// 		{
	// 			id:'2d85af43-4d63-44f3-bc38-7a414386058e',
	// 			title:'Allan Quatermain and the Lost City of Gold',
	// 			duration:'99',
	// 			director:'Gary Nelson',
	// 			actors:[
	// 				{name:'Richard Chamberlain',character:'Allan Quatermain'},
	// 				{name:'Sharon Stone',character:'Jesse Huston'},
	// 				{name:'James Earl Jones',character:'Umslopogaas'},
	// 				{name:'Henry Silva',character:'Agon'}
	// 			],
	// 			synopsis:"After his brother Robeson disappears without a trace while exploring Africa in search of a legendary 'white tribe', Alan Quatermain decides to follow in his footsteps to learn what became of him. Soon after arriving, he discovers the los City of Gold, controlled by the evil lord Agon, and mined by his legions of white slaves. Is this where Robeson met his end?",
	// 			year:'1986',
	// 			genres:['action','adventure'],
	// 			size:{width:'640', height:'360'}
	// 		},
	// 		{
	// 			id:'1096ba51-64d1-48f7-9b7e-2c92a65b9189',
	// 			title:"God's Little Acre",
	// 			duration:'118',
	// 			director:'Anthony Mann',
	// 			actors:[
	// 				{name:'Robert Ryan',character:'Ty Ty Walden'},
	// 				{name:'Tina Louise',character:'Griselda Walden'},
	// 				{name:'Aldo Ray',character:'Will Thompson'},
	// 				{name:'Buddy Hackett',character:'Pluto Swint'}
	// 			],
	// 			synopsis:"A poor farmer is obsessed with finding gold on his land supposedly buried by his grandfather. To find it he conveniently moves a marker out of his way that designates the land on which it rests as as God's Little Acre, where anything that comes from the ground will go to God's work. Eventually he abducts an albino to help him find the gold. Meanwhile, his daughter-in-law is suspected of fooling around with a labor activist out of work since the mill closed, and a local political hopeful actively seeks his daughter's hand in marriage.",
	// 			year:'1958',
	// 			genres:['comedy','drama'],
	// 			size:{width:'640', height:'360'}
	// 		},
	// 		{
	// 			id:'796824c2-1d35-4d31-9284-9d73d24a0dd3',
	// 			title:'Careful What You Wish For',
	// 			duration:'91',
	// 			director:'Elizabeth Allen Rosenbaum',
	// 			actors:[
	// 				{name:'Isabel Lucas',character:'Lena'},
	// 				{name:'Dermot Mulroney',character:'Pluto Swint'},
	// 				{name:'Nick Jonas',character:'Doug Martin'},
	// 				{name:'Kandyse McClure',character:'Angie Alvarez'}
	// 			],
	// 			synopsis:"A guy gets more than he bargained for after entering into an affair with the wife of an investment banker. Soon, a suspicious death and substantial life insurance policy embroil him in a scandal.",
	// 			year:'2015',
	// 			genres:['thriller'],
	// 			size:{width:'854', height:'480'}
	// 		},
	// 		{
	// 			id:'13f69084-d079-4732-b3b1-80ab88cece8b',
	// 			title:'Singles',
	// 			duration:'99',
	// 			director:'Cameron Crowe',
	// 			actors:[
	// 				{name:'Bridget Fonda',character:'Janet Livermore'},
	// 				{name:'Campbell Scott',character:'Steve Dunne'},
	// 				{name:'Kyra Sedgwick',character:'Linda Powell'},
	// 				{name:'Sheila Kelley',character:'Debbie Hunt'}
	// 			],
	// 			synopsis:"Romantic comedy about six of Seattle young people, most of whom live in the same apartment building and whose lives revolve around the city's ever-expanding music scene. The inter-related stories about each character's progress through the singles scene are intriguing and often very funny, and the soundtrack is a grunge fanatic's dream, with the likes of Soundgarden, Pearl Jam and Mudhoney.",
	// 			year:'1992',
	// 			genres:['comedy','drama'],
	// 			size:{width:'640', height:'360'}
	// 		},
	// 		{
	// 			id:'a2b7b231-ddb5-49ee-91ce-f0c23cc94fa0',
	// 			title:'Love, Rosie',
	// 			duration:'102',
	// 			director:'Christian Ditter',
	// 			actors:[
	// 				{name:'Lily Collins ',character:'Rosie Dunne'},
	// 				{name:'Sam Claflin',character:'Alex Stewart'},
	// 				{name:'Christian Cooke',character:'Greg'},
	// 				{name:'Jaime Winstone',character:'Ruby'}
	// 			],
	// 			synopsis:"Rosie and Alex have been best friends since they were 5, so they couldn't possibly be right for one another... or could they? When it comes to love, life and making the right choices, these two are their own worst enemies. One awkward turn at 18, one missed opportunity... and life sends them hurling in different directions. But somehow, across time, space and different continents, the tie that binds them cannot be undone. Will they find their way back to one another, or will it be too late? Based on Cecelia Ahern's bestselling novel 'Where Rainbows End', LOVE, ROSIE is a modern comedy-of-errors tale posing the ultimate question: Do we really only get one shot at true love?",
	// 			year:'1985',
	// 			genres:['Comedy','Family'],
	// 			size:{width:'640', height:'360'}
	// 		},
	// 		{
	// 			id:'f8d683b1-ed3e-47f9-9469-13ea03431325',
	// 			title:'Return to Oz',
	// 			duration:'113',
	// 			director:'Walter Murch',
	// 			actors:[
	// 				{name:'Fairuza Balk',character:'Dorothy'},
	// 				{name:'Nicol Williamson',character:'Dr. Worley/Nome King'},
	// 				{name:'Jean Marsh',character:'Nurse Wilson/Mombi'},
	// 				{name:'Piper Laurie',character:'Aunt Em'}
	// 			],
	// 			synopsis:"Dorothy Gale has recently come home to Kansas from the Land of Oz is now almost back to perfect health since the incident of the tornado, only she cannot get that wonderful place out of her head. She frequently talks about it and cannot get any sleep at night. Aunt Em worries about her health/well-being. Thinking that she is suffering delusional depression and acute insomnia, she decides to take her to see a special doctor in another town. While he tries to treat her with electro-shock treatment and take those nasty dreams away from her head, she is rescued by a mysterious girl who leads her back to Oz for a new adventure.",
	// 			year:'1985',
	// 			genres:['Adventure','Family'],
	// 			size:{width:'640', height:'360'}
	// 		},
	// 		{
	// 			id:'018b3f55-fb42-4f01-847b-055a89ab2ae9',
	// 			title:'Axe Giant: The Wrath of Paul Bunyan',
	// 			duration:'90',
	// 			director:'Gary Jones',
	// 			actors:[
	// 				{name:'Joe Estevez',character:'Meeks'},
	// 				{name:'Dan Haggerty',character:'Foreman Bill'},
	// 				{name:'Thomas Downey',character:'Sgt. Hoke'},
	// 				{name:'Amber Connor',character:'CB'}
	// 			],
	// 			synopsis:"Young adults at a first-time offenders' boot camp discover the legend of the giant lumberjack Paul Bunyan is real, but is much more horrifying than they could have imagined.",
	// 			year:'2013',
	// 			genres:['Fantasy','Horror'],
	// 			size:{width:'640', height:'360'}
	// 		},
	// 		{
	// 			id:'13855293-0280-4d54-a116-fb8173d07c87',
	// 			title:'Cake',
	// 			duration:'102',
	// 			director:'Daniel Barnz',
	// 			actors:[
	// 				{name:'Jennifer Aniston',character:'Claire Bennett'},
	// 				{name:'Adriana Barraza',character:'Silvana'},
	// 				{name:'Anna Kendrick',character:'Nina Collins'},
	// 				{name:'Sam Worthington',character:'Roy Collins'}
	// 			],
	// 			synopsis:"The acerbic, hilarious CLAIRE SIMMONS becomes fascinated by the suicide of a woman in her chronic pain support group. As she uncovers the details of Nina's suicide and develops a poignant relationship with Nina's husband, she also grapples with her own, very raw personal tragedy.",
	// 			year:'2014',
	// 			genres:['Drama'],
	// 			size:{width:'640', height:'360'}
	// 		}
  //   ];
  //
  //   for(var i=0; i<movies.length; i++){
  //     Movies.insert(movies[i]);
  //   }
  //
  // }

});
