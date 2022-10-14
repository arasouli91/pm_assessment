// Store Class: Handles Storage
class Store
{
    static getId()
    {
        // Ideally: would be generating a uuid here
        let id = localStorage.getItem('id');
        if (id === null)
        {
            id = -1;
        } else
        {
            id = parseInt(id);
        }
        id += 1;// next consecutive id
        localStorage.setItem('id', id);
        return id;
    }

    static getQueue(id)
    {
        let queues = Store.getQueues();
        for (let i = 0; i < queues.length; ++i)
        {
            if (queues[i].id === parseInt(id))
            {
                return queues[i];
            }
        }
        return null;
    }

    static getQueues()
    {
        let queues = localStorage.getItem('queues');
        if (queues === null)
        {
            queues = [];
        } else
        {
            let temp = localStorage.getItem('queues');
            queues = JSON.parse(temp);
        }

        return queues;
    }

    static addQueue(queue)
    {
        const queues = Store.getQueues();
        queues.push(queue);
        localStorage.setItem('queues', JSON.stringify(queues));
    }

    static updateQueue(queue)
    {
        let queues = Store.getQueues();
        for (let i = 0; i < queues.length; ++i)
        {
            if (queues[i].id === parseInt(queue.id))
            {
                queues[i] = queue;
                break;
            }
        }
        localStorage.setItem('queues', JSON.stringify(queues));
    }

    static removeQueue(id)
    {
        const queues = Store.getQueues();

        queues.forEach((queue, index) =>
        {
            if (queue.id === parseInt(id))
            {
                queues.splice(index, 1);
            }
        });

        localStorage.setItem('queues', JSON.stringify(queues));
    }

    static moveQueue(id, change)
    {
        let queues = Store.getQueues();
        let queue = null;
        let ndx = -1;
        for (let i = 0; i < queues.length; ++i)
        {
            if (queues[i].id === parseInt(id)) 
            {
                ndx = i;
                break;
            }
        }
        if (ndx == -1 || (queues.length == 1) || (ndx === 0 && change === -1) || (ndx === queues.length - 1 && change === 1))
        {
            return;
        }
        Util.arrayMove(queues, ndx, ndx + change);
        localStorage.setItem('queues', JSON.stringify(queues));
    }
}