

export default class Inventory
{
	constructor()
	{
		this.items = 
		{
			//0: {name: 'pickaxe', quantity: 1},
			//2: {name: 'stone', quantity: 3}
		}
		this.observers = [];

		this.maxColumns = 10;
		this.maxRows = 3;

		this.currentItem = 0;

		this.addItem({name: 'pickaxe', quantity: 2})
		this.addItem({name: 'stone', quantity: 3})
	}

	addItem(item)
	{
		let isInInventory = Object.keys(this.items).find(key => this.items[key].name === item.name);

		if(isInInventory)
		{
			this.items[isInInventory].quantity += item.quantity;
		}
		else 
		{
			for(let i = 0; i < this.maxColumns * this.maxRows; i++)
			{
				let occupiedSlot = this.items[i];
				if(!occupiedSlot)
				{
					this.items[i] = item;
					break;
				}
			}
		}
		this.broadcast();
	}

	getItem(gridNumber)
	{
		return this.items[gridNumber]
	}

	changeSlot(startingSlot, endingSlot)
	{
		if(startingSlot === endingSlot || this.items[endingSlot])
		{
			return;
		}
		this.items[endingSlot] = this.items[startingSlot];
		delete this.items[startingSlot];
		this.broadcast();
	}

	subscribe(fn)
	{
		this.observers.push(fn);
	}

	unsubscribe(fn)
	{
		this.observers = this.observers.filter(subscriber => subscriber !== fn);
	}

	broadcast()
	{
		this.observers.forEach(subscriber => subscriber());
	}
}