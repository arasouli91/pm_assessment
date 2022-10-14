class Queue
{
    constructor(id, chkDefault, name, chkOutOrderAcc, chkWorkQueue,
        chkAmendReq, chkBalMode, desc, permits, envelopes, statuses)
    {
        this.id = id;
        this.chkDefault = chkDefault;
        this.name = name;
        this.chkOutOrderAcc = chkOutOrderAcc;
        this.chkWorkQueue = chkWorkQueue;
        this.chkAmendReq = chkAmendReq;
        this.chkBalMode = chkBalMode;
        this.desc = desc;
        this.permits = permits;
        this.envelopes = envelopes;
        this.statuses = statuses;
    }
}

class QueueManager
{
    static queueCount = 0;
    static buttonPathLen = 3;

    static displayQueues()
    {
        QueueManager.clearQueues();

        const queues = Store.getQueues();

        QueueManager.queueCount = 0;

        queues.forEach((queue) => QueueManager.addQueueToList(queue));
    }

    static clearQueues()
    {
        document.querySelector('#queue-list').innerHTML = '';
    }

    static addQueueToList(queue)
    {
        QueueManager.queueCount++;

        const list = document.querySelector('#queue-list');
        const row = document.createElement('tr');
        row.innerHTML = `
        <td>${queue.chkDefault ? checkSvg : ''}</td>
        <td class="w-75">${queue.name}</td>
        <td>${queue.permits.length > 0 ? checkSvg : ''}</td>
        <td>${queue.envelopes.length > 0 ? checkSvg : ''}</td>
        <td>${queue.statuses.length > 0 ? checkSvg : ''}</td>
        <td>${queue.chkAmendReq ? checkSvg : ''}</td> 
        <td>
            <a class="btn btn-secondary btn-sm edit" data-bs-toggle="modal" data-bs-target="#addEditModal">
                ${editButtonSvg}
            </a>
        </td>
        <td><a class="btn btn-danger btn-sm delete">${deleteButtonSvg}</a></td>
        <td>
            <ul class="proc-order-ul ">
                <li class="btn btn-primary btn-sm arrow-btn down-arrow">${downButtonSvg}</li>
                <li class="btn btn-primary btn-sm arrow-btn up-arrow">${upButtonSvg}</li>
                <li class="q-n">${QueueManager.queueCount}</li>
            </ul
        </td>  
        `;

        row.dataset['id'] = queue.id;

        list.appendChild(row);
    }

    // This will populate the edit queue modal
    // the HTML will take care of actually opening the modal
    static populateEditQueue(el)
    {
        // we come here from an event handler placed on the queue list
        // so, we first verify that the edit button was clicked

        let id = QueueManager.searchForRowId(el, 'edit');
        if (id === null)
        {
            return false; // queue-list was clicked, but edit was not
        }

        const queue = Store.getQueue(id);
        // Populate elements in edit queue modal
        const queueForm = document.querySelector("#queue-form");
        queueForm.querySelector('#qId').value = queue.id;
        queueForm.querySelector('#chkDefault').checked = queue.chkDefault;
        queueForm.querySelector('#qName').value = queue.name;
        queueForm.querySelector('#chkOutOrderAcc').checked = queue.chkOutOrderAcc;
        queueForm.querySelector('#chkWorkQueue').checked = queue.chkWorkQueue;
        queueForm.querySelector('#chkAmendReq').checked = queue.chkAmendReq;
        queueForm.querySelector('#chkBalMode').checked = queue.chkBalMode;
        queueForm.querySelector('#qDesc').value = queue.desc;

        // Populate Permits table
        PermitManager.populatePermits(queue.permits);

        // Populate Envelopes table
        EnvelopeManager.populateEnvelopes(queue.envelopes);

        // Populate Statuses table
        StatusManager.populateStatuses(queue.statuses);
        return true;
    }

    static deleteQueue(el)
    {
        let id = QueueManager.searchForRowId(el, 'delete');
        if (id !== null) // null id, means we didn't hit delete
        {
            Store.removeQueue(id);
            QueueManager.displayQueues();
            return true;
        }
        return false;
    }

    static moveUpDownQueue(el)
    {
        let id = QueueManager.searchForRowId(el, 'up-arrow');
        if (id !== null) // null id, means we didn't hit up arrow
        {
            // move current queue up
            Store.moveQueue(id, -1);
            QueueManager.displayQueues();
            return true;
        }
        id = QueueManager.searchForRowId(el, 'down-arrow');
        if (id !== null) // null id, means we didn't hit down arrow 
        {
            Store.moveQueue(id, 1);
            QueueManager.displayQueues();
            return true;
        }

        return false;
    }

    static searchForRowId(el, searchClass)
    {
        // walk up parents to find the row and get the id
        let elem = el;
        for (let i = 0; i < QueueManager.buttonPathLen; ++i)
        {
            if (elem.classList.contains(searchClass))
            {
                // we found what we were looking for
                // now click up until reaching the row
                while (true)
                {
                    if (elem.tagName === 'TR')
                    {
                        return elem.dataset['id'];
                    }
                    else
                    {
                        elem = elem.parentElement;
                    }
                }
            }
            else
            {
                elem = elem.parentElement;
            }
        }
        return null;
    }
}




