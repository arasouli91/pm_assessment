// Ideally: Would be using classes like this for reusability
/*
class EnvelopeTable extends QueueTableOption
{
    EnvelopeTable()
    {
        const listElemId = "#envelope-list";
        const tableFmtStr = `
        <td class="env-col">
          <select class="form-select form-select-lg mb-1 mt-1" aria-label=".form-select-lg example"> 
            <option class="def-opt" selected>Select Envelope Type</option>
            {0}
          </select> 
        </td>
        <td>
            <input type="text" id="min" value='{1}' class="form-control mt-2">
        </td>
        <td>
            <input type="text" id="max" value='{2}' class="form-control mt-2">  
        </td>
        <td><a class="btn btn-danger btn-sm mt-2 delete">${deleteButtonSvg}</a></td> 
        `
        const addOptionFmtStr = "<option value='{0}'>{1}</option>";
        const populateOptionFmtStr = "<option value='{0}' {1}>{2}</option>";
        super(listElemId, tableFmtStr, addOptionFmtStr, populateOptionFmtStr);
    }
}
*/

class EnvelopeManager
{
    static envelopes = ["Env1", "Env2", "Env3"];

    // Add a row to envelope-list, the user will then select an option
    static addEnvelopeToList()
    {
        const envelopesListStr = EnvelopeManager.envelopes.reduce((acc, cur, i) =>
        {
            return acc = acc + `<option value="${i}">${cur}</option>`
        }, ``);

        const list = document.querySelector('#envelope-list');

        const row = document.createElement('tr');
        row.className = "grey-row";
        row.innerHTML = `
        <td class="env-col">
          <select class="form-select form-select-lg mb-1 mt-1" aria-label=".form-select-lg example"> 
            <option class="def-opt" selected>Select Envelope Type</option>
            ${envelopesListStr}
          </select> 
        </td>
        <td>
            <input type="text" id="min" class="form-control mt-2">
        </td>
        <td>
            <input type="text" id="max" class="form-control mt-2">  
        </td>
        <td><a class="btn btn-danger btn-sm mt-2 delete">${deleteButtonSvg}</a></td> 
        `;

        list.appendChild(row);
    }

    static deleteEnvelope(e)
    {
        e.stopPropagation();
        let el = e.target;
        // we come here from an event handler placed on the envelope list
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

    static populateEnvelopes(envelopes)
    {
        const envelopeList = document.querySelector('#envelope-list');

        // Clear any envelopes that may have been previously populated
        envelopeList.innerHTML = '';

        // Populate envelope-list with the envelopes that were stored for this queue
        for (let envelope of envelopes)
        {
            const envelopeListStr = EnvelopeManager.envelopes.reduce((acc, cur, i) =>
            {
                return acc = acc + `<option value="${i}" ${envelope.name === cur ? "selected" : ''}>${cur}</option>`
            }, ``);

            const row = document.createElement('tr');
            row.className = "grey-row";
            row.innerHTML = `
            <td>
              <select class="form-select form-select-lg mb-3 w-75" aria-label=".form-select-lg example">
                <option>Select Envelope Type</option> 
                ${envelopeListStr}
              </select> 
            </td>
            <td>
                <input type="text" id="min" value=${envelope.min} class="form-control mt-2">
            </td>
            <td>
                <input type="text" id="max" value=${envelope.max} class="form-control mt-2">  
            </td>
            <td><a class="btn btn-danger btn-sm mt-2 delete">${deleteButtonSvg}</a></td> 
            `;
            envelopeList.appendChild(row);
        }
    }
}

// Event: Remove a envelope
document.querySelector('#envelope-list')
    .addEventListener('click', (e) => EnvelopeManager.deleteEnvelope(e));

// Event: Add new envelope
document.querySelector("#addEnvelope").addEventListener('click', (e) =>
{
    EnvelopeManager.addEnvelopeToList();
});