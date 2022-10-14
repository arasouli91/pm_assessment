String.prototype.format = function ()
{
    // store arguments in an array
    var args = arguments;
    // use replace to iterate over the string
    // select the match and check if the related argument is present
    // if yes, replace the match with the argument
    return this.replace(/{([0-9]+)}/g, function (match, index)
    {
        // check if the argument is present
        return typeof args[index] == 'undefined' ? match : args[index];
    });
};

class QueueTableOption
{
    QueueTableOption(listElemId, tableFmtStr, addOptionFmtStr, populateOptionFmtStr)
    {
        this.listElemId = listElemId;
        this.tableFmtStr = tableFmtStr;
        this.addOptionFmtStr = addOptionFmtStr;
        this.populateOptionFmtStr = populateOptionFmtStr;

        // Event: Remove an item from list
        document.querySelector(listElemId)
            .addEventListener('click', (e) => this.deleteItem(e));
    }

    // Add a row to list, the user will then select an option
    addItemToList()
    {
        const optionListStr = this.items.reduce((acc, cur, i) =>
        {
            let str = addOptionFmtStr.format(i, cur);
            return acc = acc + str;
        }, ``);

        const list = document.querySelector(listElemId);

        const row = document.createElement('tr');
        row.className = "grey-row";
        
        //TODO: How to pass in the extra min/max values for Envelope 
        row.innerHTML = tableFmtStr.format(optionListStr);

        list.appendChild(row);
    }

    deleteItem(e)
    {
        e.stopPropagation();
        let el = e.target;
        // we come here from an event handler placed on the item list
        // so, we first verify that the delete button was clicked
        if (el.classList.contains('delete'))
        {
            el.parentElement.parentElement.remove();  // remove the tr
        }
        if (el.parentElement.classList.contains('delete')) // hit svg
        {
            el.parentElement.parentElement.parentElement.remove();  // remove the tr
        }
        if (el.parentElement.parentElement.classList.contains('delete')) // hit svg path
        {
            el.parentElement.parentElement.parentElement.parentElement.remove();  // remove the tr
        }
    }

    populateItems(items)
    {
        const itemList = document.querySelector(this.itemListStr);

        // Clear any items that may have been previously populated
        itemList.innerHTML = '';

        // Populate list with the items that were stored for this queue
        for (let item of items)
        {
            // Generate options in the select
            const optionListStr = this.items.reduce((acc, cur, i) =>
            {
                // mark selected for the option that corresponds to the value that was stored for this item 
                let selected = item === cur ? "selected" : '';
                let str = addOptionFmtStr.format(i, selected, cur);
                return acc = acc + str;
            }, ``);

            const row = document.createElement('tr');
            row.className = "grey-row";
            row.innerHTML = tableFmtStr.format(optionListStr);

            console.log(item);
            console.log(row);
            itemList.appendChild(row);
        }
    }
}