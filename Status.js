class StatusManager
{
    static statuses = ["Status 1", "Status 2", "Status 3"];

    // Add a row to status-list, the user will then select an option
    static addStatusToList()
    {
        const statusListStr = StatusManager.statuses.reduce((acc, cur, i) =>
        {
            return acc = acc + `<option value="${i}">${cur}</option>`
        }, ``);

        const list = document.querySelector('#status-list');

        const row = document.createElement('tr');
        row.className = "grey-row";
        row.innerHTML = `
        <td>
          <select class="form-select form-select-lg mb-1 mt-1" aria-label=".form-select-lg example"> 
            <option class="def-opt" selected>Select Status Type</option>
            ${statusListStr}
          </select> 
        </td>
        <td><a class="btn btn-danger btn-sm mt-2 delete">${deleteButtonSvg}</a></td> 
        `;

        list.appendChild(row);
    }

    static deleteStatus(e)
    {
        e.stopPropagation();
        let el = e.target;
        // we come here from an event handler placed on the status list
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

    static populateStatuses(statuses)
    {
        const statusList = document.querySelector('#status-list');

        // Clear any statuses that may have been previously populated
        statusList.innerHTML = '';

        // Populate status-list with the statuses that were stored for this queue
        for (let status of statuses)
        {
            const statusListStr = StatusManager.statuses.reduce((acc, cur, i) =>
            {
                return acc = acc + `<option value="${i}" ${status === cur ? "selected" : ''}>${cur}</option>`
            }, ``);

            const row = document.createElement('tr');
            row.className = "grey-row";
            row.innerHTML = `
            <td>
              <select class="form-select form-select-lg mb-3 w-75" aria-label=".form-select-lg example">
                <option>Select Status Type</option> 
                ${statusListStr}
              </select> 
            </td>
            <td><a class="btn btn-danger btn-sm mt-2 delete">${deleteButtonSvg}</a></td> 
            `;
            statusList.appendChild(row);
        }
    }
}

// Event: Remove a status
document.querySelector('#status-list')
    .addEventListener('click', (e) => StatusManager.deleteStatus(e));

// Event: Add new status
document.querySelector("#addStatus").addEventListener('click', (e) =>
{
    StatusManager.addStatusToList();
});