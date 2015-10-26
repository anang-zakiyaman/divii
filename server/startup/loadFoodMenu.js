Meteor.startup(function(){

  if(FoodMenu.find().count() === 0){
    var foodMenu = [
      {
				id:'50dac069-2d3d-4c44-a136-7a322913605d',
				title:'Vegetable Pasta',
				description:'Introducing our healthier option; Vegetable Pasta! Fusilli pasta served with generous amount of broccoli, brinjal, zucchini, red capsicum, cherry tomato and black olive. Lightly seasoned with garlic and olive oil to complete the meal!',
			  vegetarian: false,
        currency: 'IDR',
        price: '32000'
      },
      {
        id:'af1fbea7-0ee0-47bb-bfe7-5ae040b8d971',
				title:'Roast Chicken with Cream Sauce',
				description:'A splendid combination of marinated roast chicken served with thick creamy sauce, complemented with a generous side of buttered carrots, pumpkin, broccoli and roasted potatoes that are seasoned to perfection!',
        vegetarian: false,
        currency: 'IDR',
        price: '35000'
			},
      {
        id:'2d85af43-4d63-44f3-bc38-7a414386058e',
				title:'Ginger Fried Rice with Vegetarian Chicken',
				description:'Vegetarian Fried Rice, spiced up with fragrant ginger. Complemented with succulent stewed vegetarian chicken.',
        vegetarian: true,
        currency: 'IDR',
        price: '22000'
			},
      {
        id:'1096ba51-64d1-48f7-9b7e-2c92a65b9189',
				title:'Vegetable Briyani',
				description:'Rich in spices yet low on the heat factor, this mild potato and carrot curry will leave you wanting for more. The combination of the Vegetable Subji, Channa Masala and the flavourful Briyani rice is exactly what you need to warm you up on a chilly day.',
        vegetarian: true,
        currency: 'IDR',
        price: '25000'
			},
      {
        id:'796824c2-1d35-4d31-9284-9d73d24a0dd3',
				title:'Pak Nasser Nasi Lemak',
				description:'A traditional Malaysian favourite fragrant coconut rice served with Pak Nassers special chilli sambal and tender chicken rendang, accompanied with traditional condiments of fried anchovies, crunchy groundnuts and half of a hard-boiled egg.',
        vegetarian: false,
        currency: 'IDR',
        price: '30000'
			},
      {
        id:'13f69084-d079-4732-b3b1-80ab88cece8b',
				title:'Chicken Rice',
				description:'A Chinese Malaysian favourite of fluffy seasoned rice served with roast chicken and accompanied with Uncle Chins special secret chilli, ginger and garlic sauce.',
        vegetarian: false,
        currency: 'IDR',
        price: '27500'
			},
      {
        id:'a2b7b231-ddb5-49ee-91ce-f0c23cc94fa0',
				title:'Bukhara Chicken Briyani',
				description:'Chicken tender cooked in Bukhara hot and spicy sauce served with aromatic basmati rice with an authentic blend of selected spices exclusively made to give you that tantalizing taste.',
        vegetarian: false,
        currency: 'IDR',
        price: '24000'
			},
      {
        id:'f8d683b1-ed3e-47f9-9469-13ea03431325',
				title:'Mac and Cheese with Chicken Meatballs',
				description:'An all-time favourite is here! Classic macaroni with cheese, served with broccoli and tender chicken meatballs in tomato-based sauce.',
        vegetarian: false,
        currency: 'IDR',
        price: '22000'
			},
      {
        id:'018b3f55-fb42-4f01-847b-055a89ab2ae9',
				title:'Kid’s Meal (Mini Chicken Burgers + Ribena)',
				description:'Our exciting new chicken burgers come in a pair with two different flavours just for our young travellers! One with mayonnaise and orange cheddar and the other has sweet barbecue sauce with yellow cheddar. Enjoy, kids!',
        vegetarian: false,
        currency: 'IDR',
        price: '20000'
			},
      {
        id:'13855293-0280-4d54-a116-fb8173d07c87',
				title:'Chicken Satay Wrap',
				description:'Wholesome and superbly tasty! Filled with juicy grilled chicken satay and crunchy vegetables, this wrap is served together with its best complement, a spicy peanut sauce to complete the meal.',
        vegetarian: false,
        currency: 'IDR',
        price: '45000'
			}
    ];

    for(var i=0; i<foodMenu.length; i++){
      FoodMenu.insert(foodMenu[i]);
    }

  }

});
