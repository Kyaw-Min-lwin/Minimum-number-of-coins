function validate(amount) {
	amount = amount + '';
	let temp = amount.replace(/^£|p$/g, '');

	if (temp.length <= 0 || Number.isNaN(temp * 1) || Number(temp) <= 0) {
		return false;
	}
	// if the amount is in pound
	if (amount.match(/^£/) || temp.includes('.')) {
		amount = amount.replace('p', '');
		if (temp.includes('.')) {
			return temp.match(/.+\..+/) ? '£' + temp : false;
		}
		return amount;
	}
	// if the amount is in penny
	else if (amount.match(/p$/) || Number.isInteger(temp * 1)) {
		return temp + 'p';
	}
	return false;
}

function someUnamedFunction(amount, arr) {
	let j = 0, storage = [], coinCount;

	for (let i = arr.length - 1; i >= 0 && amount > 0; i--) {
		coinCount = 0;
		j = arr[i];
		if (amount === arr[i]) {
			amount -= arr[i];
			coinCount++;
			storage.push([coinCount, arr[i]]);
			continue;
		}
		if (amount > j) {
			while (amount >= j) {
				coinCount++;
				j += arr[i];
			}
			j = j - arr[i];
			amount -= j;
			storage.push([coinCount, arr[i]]);
		}
	}
	return storage;
}

function leastAmount(amount) {
	let str = "";
	let pounds = [1, 2];
	let pence = [1, 2, 5, 10, 20, 50];

	// if the amount is in pounds
	if (amount.includes("£")) {
		amount = Number(amount.slice(1));
		//if it's in decimal form
		if (amount % 1 !== 0) {
			str += returnString(someUnamedFunction(Math.floor(amount / 1), pounds), "£") + ", ";
			str += returnString(someUnamedFunction(Math.round((amount % 1 + Number.EPSILON) * 100), pence), "p");
		} else {
			str += returnString(someUnamedFunction(amount, pounds), "£");
		}
  } else {
	  amount = Number(amount.slice(0, -1));
	  if (amount % 1 !== 0) {
      //if it's in decimal form
			str +=
				returnString(someUnamedFunction(Math.floor(amount / 1), pounds), "£") +
				", ";
			str += returnString(
				someUnamedFunction((amount % 1).toFixed(2) * 100, pence),
				"p"
			);
		}
		// if the amount is in pence
		else if (amount >= 100) {
			// must be converted to pounds first
			str +=
				returnString(
					someUnamedFunction(Math.floor(amount / 100), pounds),
					"£"
				) + ", ";
			str += returnString(someUnamedFunction(amount % 100, pence), "p");
		} else {
			// It is 100% in pence and less than 100 pence
			str += returnString(someUnamedFunction(amount, pence), "p");
		}
	}
	str = str.split(",").filter((a) => a.length > 1)
	let a = str[str.length - 1];
	if (str.length > 1) {
		return str.slice(0, -1).join(",") + ` and${a}`;
	} else {
		return str.join(',');
	}
}

function returnString(arr, unit) {
	let str = "",
		coin = "coin";
	if (unit === "p") {
		arr.forEach((array) => {
			coin = array[0] > 1 ? "coins" : "coin";
			str += `${array[0]} ${array[1]}${unit} ${coin}, `;
		});
	} else {
		arr.forEach((array) => {
			coin = array[0] > 1 ? "coins" : "coin";
			str += `${array[0]} ${unit}${array[1]} ${coin}, `;
		});
	}

	return str.slice(0, -2);
}

function minCoins(amount) {
	amount = validate(amount);
	if (!amount) {
		return "Invalid input - enter a positive amount of money";
	}

	return leastAmount(amount).trim();
}
