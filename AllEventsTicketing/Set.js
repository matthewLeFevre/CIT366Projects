function Set() {
	
	
	this.intersection = function(listA, listB) {
    
	   var resultList = [];
       
	   /*-------------------------------Insert your code here -------------------------------------*/
	   if (listA === null || listB === null) {
			 return null;
		 }

		 for(let i = 0; i < listA.length; i++) {
			 let listAStage = listA[i];
			 for (let j = 0; j < listB.length; j++) {
				 let listBStage = listB[j];
				 if (listAStage === listBStage) {
					 resultList.push(listBStage);
				 }
			 }
		 }
	   /*-------------------------------Insert your code here -------------------------------------*/
       
	   return resultList;
	}
    
    
    
	this.union = function(listA, listB) {

	   var resultList = [];
       
	   /*-------------------------------Insert your code here -------------------------------------*/
		if (listA === null || listB === null) {
			return null;
		}

		// Send all of list a because there are no dupliates
		for(let i = 0; i < listA.length; i++) {
			resultList.push(listA[i]);
		}


		for(let i = 0; i < listB.length; i ++) {
			let pushIt = true;
			for(let j = 0; j < listA.length; j ++) {
				if (listB[i] === listA[j]) {
					pushIt = false;
				}
			}
			if(pushit) {
				resultList.push(listBStage);
			}
		}

		 /*-------------------------------Insert your code here -------------------------------------*/ 
	   return resultList;
	}




	this.relativeComplement = function(listA, listB) {

	   var resultList = [];
       
	   /*-------------------------------Insert your code here -------------------------------------*/
		if (listA === null || listB === null) {
			return null;
		}

		if(listB.length === 0) {
			for( let i = 0; i < listA.length; i++) {
				resultList.push(listA[i]);
			}
			return resultList;
		}



		for(let i = 0; i < listA.length; i++) {
			let listAStage = listA[i];
			let pushIt = true;
			for (let j = 0; j < listB.length; j++) {
				let listBStage = listB[j];
				if (listAStage === listBStage) {
					pushIt = false;
				}
			}
			if(pushIt){
				resultList.push(listAStage);
			}
		}
	   /*-------------------------------Insert your code here -------------------------------------*/
	   return resultList;
	}



	this.symmetricDifference = function(listA, listB) {

	   var resultList = [];
       
	   /*-------------------------------Insert your code here -------------------------------------*/
		if (listA === null || listB === null) {
			return null;
		}

		let intersection = this.intersection(listA, listB);
		let union				 = this.union(listA, listB);
		let unionLen     = union.length;
		for ( let i = 0; i < intersection.length; i++) {
			for (let j = 0; j < unionLen; j++) {
				if( intersection[i] === union[j] ) {
					union[j] = null;
					// console.log( union);
				}
			}
		}

		for ( let i = 0; i < union.length; i ++) {
			if (union[i] !== null) {
				resultList.push(union[i]);
			}
		}
	   /*-------------------------------Insert your code here -------------------------------------*/
       
	   return resultList;
	}	
	

}
