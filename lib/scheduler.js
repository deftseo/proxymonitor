var TICK_DELAY      = 200,
    MAX_ASYNC_TASKS = 10;


function Scheduler(task) {
    if (!(this instanceof Scheduler)) {
        return new Scheduler(task);
    }

    this.task   = task;
    this.queue  = [];

    this.ticker     = null;
    this.tickLength = TICK_DELAY;
    this.maxTasks   = MAX_ASYNC_TASKS;

    this.stats = {
        total: 0,
        active: 0,
        completed: 0
    }
}

Scheduler.prototype._tick = function() {
    var self = this,
        job;

    if (this.queue.length) {
        // We have jobs, do we have capacity?
        if (this.stats.active < self.maxTasks) {
            // We have capacity, start another task
            job = this.queue.shift();
            if (job) {
                this.stats.total++;
                this.stats.active++;

                this.task(job, function() {
                    self.stats.active--;
                    self.stats.completed++;
                });
            }
        }
    } else if (this.stats.active) {
        // Keep ticking, we have active jobs

    } else {
        // Empty queue, no active jobs. We are done.
        this.stop();
    }
}

Scheduler.prototype.start = function() {
    var self = this;

    console.log('Starting scheduler', '(with', this.queue.length, 'queued jobs)');
    this.ticker = setInterval(function() {
            self._tick();
        }, 
        self.tickLength
    );
}

Scheduler.prototype.stop = function() {
    console.log('Stopping scheduler');
    clearInterval(this.ticker);
}

Scheduler.prototype.add = function(job) {
    //console.log('Job added to scheduler queue');
    this.queue.push(job);
}




module.exports = {
    Scheduler: function (task) {
        var scheduler = new Scheduler(task);
        return scheduler;
    }
};
