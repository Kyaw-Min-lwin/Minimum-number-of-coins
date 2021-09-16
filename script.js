
function validate(amount) {
	// starts with a £ so pounds --ends with a p so pennies and no other £ or p in btw
	// if it is a float - it is in pounds else if it is an integer ,it is in pennies

	//checks if number is an integer or is a decimal
	if (!Number.isNaN(+amount)) {
		if (Number.isInteger(amount)) {
			return amount + "p";
		} else {
			return "£" + amount;
		}
	}

	// the amount is in string format from this point on
	// check if it includes a £ symbol or a penny(p) symbol and,  it doesn't include both symbols at the same time
	if (
		(amount.includes("£") === false && amount.includes("p") === false) ||
		(amount.includes("p") === true && amount.includes("£") === true)
	) {
		return false;
	}

	// check if there is a £ at the start or a p at the end n make sure there is only 1 symbol and the amount is positive
	if (
		amount.match(/(^£.*)|(.*p$)/g) &&
		amount.match(/£|p/g).length === 1 &&
		!amount.includes("-")
	) {
		return amount;
	}
	return false;
}

function replyString(amount) {
	//
}

function someUnamedFunction(amount, arr) {
	console.log(amount, arr, 'yes')
}
function leastAmount(amount) {
	let pounds = [1, 2];
	let pennies = [1, 2, 5, 10, 20, 50];
	// if the amount is in pounds
	if (amount.includes('£')) {
		console.log('in pounds')
		if (amount.includes('.')) {
			//it's in decimal form
			amount = amount.split('.');
			someUnamedFunction(amount[0], pounds);
			someUnamedFunction(amount[1], pennies)
		} else {
			someUnamedFunction(Number(amount.slice(1)), pounds);
		}
	}
	// if the amount is in pennies
	amount = Number(amount.slice(0, -1));
	console.log('in pennies', amount)
	if (amount > 100) {
		// must be converted to pounds first
		console.log(Math.floor(amount / 100), amount % 100);
	}
	else {

		// It is 100% in pennies and less than 100 pennies
		someUnamedFunction(amount, pennies);
	}
}

function minCoins(amount) {
	console.log(amount);
	amount = validate(amount);
	if (!amount) {
		return "Invalid input - enter a positive amount of money";
	}
	leastAmount(amount);
	// console.log('\n');
	return '\n';
	// return amount;
}
