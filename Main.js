// UI Class: Handle UI Tasks
class UI
{
    // When one tab is selected, the others need to be hidden
    static setUpTabHandlers()
    {
        const queueTab = document.querySelector("#queue-tab-pane");
        const envelopesTab = document.querySelector("#envelope-tab-pane");
        const permitsTab = document.querySelector("#permit-tab-pane");
        const statusesTab = document.querySelector("#status-tab-pane");

        document.querySelector("#queue-tab").addEventListener("click", () =>
        {
            queueTab.hidden = false;
            envelopesTab.hidden = true;
            permitsTab.hidden = true;
            statusesTab.hidden = true;
        });
        document.querySelector("#envelope-tab").addEventListener("click", () =>
        {
            queueTab.hidden = true;
            envelopesTab.hidden = false;
            permitsTab.hidden = true;
            statusesTab.hidden = true;
        });
        document.querySelector("#permit-tab").addEventListener("click", () =>
        {
            queueTab.hidden = true;
            envelopesTab.hidden = true;
            permitsTab.hidden = false;
            statusesTab.hidden = true;
        });
        document.querySelector("#status-tab").addEventListener("click", () =>
        {
            queueTab.hidden = true;
            envelopesTab.hidden = true;
            permitsTab.hidden = true;
            statusesTab.hidden = false;
        });
    }

    static clearFields()
    {
        document.querySelector('#qId').value = '';
        document.querySelector('#chkDefault').checked = false;
        document.querySelector('#qName').value = '';
        document.querySelector('#chkOutOrderAcc').checked = false;
        document.querySelector('#chkWorkQueue').checked = false;
        document.querySelector('#chkAmendReq').checked = false;
        document.querySelector('#chkBalMode').checked = false;
        document.querySelector('#qDesc').value = '';
        document.querySelector('#permit-list').innerHTML = '';
        document.querySelector('#envelope-list').innerHTML = '';
        document.querySelector('#status-list').innerHTML = '';
    }
}

// Handle some set up when page loads
document.addEventListener('DOMContentLoaded', QueueManager.displayQueues);
document.addEventListener('DOMContentLoaded', UI.setUpTabHandlers);

// Event: Click Add Queue
document.querySelector('#addQueueBtn').addEventListener('click', (e) =>
{
    const queueTab = document.querySelector("#queue-tab");
    queueTab.click();
    UI.clearFields();
});

// Event: Add a Queue
document.querySelector('#queue-form').addEventListener('submit', (e) =>
{
    e.preventDefault(); // prevent page reload

    // Get form values
    const queueForm = document.querySelector("#queue-form");
    let qId = queueForm.querySelector('#qId').value;
    const chkDefault = queueForm.querySelector('#chkDefault').checked;
    const name = queueForm.querySelector('#qName').value;
    const chkOutOrderAcc = queueForm.querySelector('#chkOutOrderAcc').checked;
    const chkWorkQueue = queueForm.querySelector('#chkWorkQueue').checked;
    const chkAmendReq = queueForm.querySelector('#chkAmendReq').checked;
    const chkBalMode = queueForm.querySelector('#chkBalMode').checked;
    const desc = queueForm.querySelector('#qDesc').value;

    const permitListElems = queueForm.querySelectorAll("#permit-list select");
    let permitList = [];
    permitListElems.forEach((select) =>
    {
        let selected = select.querySelector("option:checked");
        // if it is default option, nothing was selected
        if (selected.classList.contains("def-opt") === false)
        {
            permitList.push(selected.text);
        }
    });

    const envelopeListElems = queueForm.querySelectorAll("#envelope-list tr");
    let envelopeList = [];
    envelopeListElems.forEach((row) =>
    {
        let selected = row.querySelector("select option:checked");
        // if it is default option, nothing was selected
        if (selected.classList.contains("def-opt") === false)
        {
            envelope = selected.text;
            let min = row.querySelector("#min").value;
            let max = row.querySelector("#max").value;
            envelopeList.push({ name: envelope, min: min, max: max });
        }
    });

    const statusListElems = queueForm.querySelectorAll("#status-list select");
    let statusList = [];
    statusListElems.forEach((select) =>
    {
        let selected = select.querySelector("option:checked");
        // if it is default option, nothing was selected
        if (selected.classList.contains("def-opt") === false)
        {
            statusList.push(selected.text);
        }
    });

    // Validate
    if (name === '') // Ideally: would have more validation
    {
        // Ideally: would show an alert
        return;
    } else
    {
        let isEdit = true;
        if (qId === null || qId === undefined || qId === '')
        {
            qId = Store.getId();
            isEdit = false;
        }
        const queue = new Queue(qId, chkDefault, name, chkOutOrderAcc, chkWorkQueue, chkAmendReq,
            chkBalMode, desc, permitList, envelopeList, statusList);

        if (isEdit === true)
        {
            Store.updateQueue(queue);
            QueueManager.displayQueues(); // rerender queues
        } else
        {
            QueueManager.addQueueToList(queue);
            Store.addQueue(queue);
        }

        UI.clearFields();
    }
});

// Event: Click on queue list. Handle interactive content
document.querySelector('#queue-list').addEventListener('click', (e) =>
{
    // Remove queue from UI, if delete was hit
    if (QueueManager.deleteQueue(e.target) === true)
    {
        return;
    }
    // Edit queue item, if edit was hit
    if (QueueManager.populateEditQueue(e.target) === true)
    {
        return;
    }
    // Move queue item, if up/down arrows hit
    QueueManager.moveUpDownQueue(e.target);
});




