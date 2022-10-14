class PermitManager
{
    static permits = ["Permit 1", "Permit 2", "Permit 3"];

    // Add a row to permit-list, the user will then select an option
    static addPermitToList()
    {
        const permitListStr = PermitManager.permits.reduce((acc, cur, i) =>
        {
            return acc = acc + `<option value="${i}">${cur}</option>`
        }, ``);

        const list = document.querySelector('#permit-list');

        const row = document.createElement('tr');
        row.className = "grey-row";
        row.innerHTML = `
        <td> 
          <select class="form-select form-select-lg mb-1 mt-1" aria-label=".form-select-lg example"> 
            <option class="def-opt" selected>Select Permit Type</option>
            ${permitListStr}
          </select> 
        </td>
        <td><a class="btn btn-danger btn-sm mt-2 delete">${deleteButtonSvg}</a></td> 
        `;

        list.appendChild(row);
    }

    static deletePermit(e)
    {
        e.stopPropagation();
        let el = e.target;
        // we come here from an event handler placed on the permit list
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

    static populatePermits(permits)
    {
        const permitList = document.querySelector('#permit-list');

        // Clear any permits that may have been previously populated
        permitList.innerHTML = '';

        // Populate permit-list with the permits that were stored for this queue
        for (let permit of permits)
        {
            const permitListStr = PermitManager.permits.reduce((acc, cur, i) =>
            {
                return acc = acc + `<option value="${i}" ${permit === cur ? "selected" : ''}>${cur}</option>`
            }, ``);

            const row = document.createElement('tr');
            row.className = "grey-row";
            row.innerHTML = `
            <td>
              <select class="form-select form-select-lg mb-3 w-75" aria-label=".form-select-lg example">
                <option>Select Permit Type</option> 
                ${permitListStr}
              </select> 
            </td>
            <td><a class="btn btn-danger btn-sm mt-2 delete">${deleteButtonSvg}</a></td> 
            `;
            permitList.appendChild(row);
        }
    }
}

// Event: Remove a permit
document.querySelector('#permit-list')
    .addEventListener('click', (e) => PermitManager.deletePermit(e));

// Event: Add new permit
document.querySelector("#addPermit").addEventListener('click', (e) =>
{
    PermitManager.addPermitToList();
});