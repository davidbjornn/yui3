(function() {

var adapt = Y.Env.eventAdaptors;

/**
 * Set up a delegated listener container.
 * @event delegate
 * @param type {string} 'delegate'
 * @param fn {string} the function to execute
 * @param el {string|node} the element that is the delegation container
 * @param event {string} the event type to delegate
 * @param spec {string} a selector that must match the target of the
 * event.
 * @param o optional context object
 * @param args 0..n additional arguments that should be provided 
 * to the listener.
 * @return {Event.Handle} the detach handle
 * @for YUI
 */
adapt.delegate = {

    on: function(type, fn, el, event, spec, o) {

        var ename = 'delegate:' + (Y.Lang.isString(el) ? el : Y.stamp(el)) + event + spec,
            a     = Y.Array(arguments, 0, true);

        // set up the event on the container
        Y.on(event, function(e) {

            var targets = e.currentTarget.queryAll(spec),
                target  = e.target, 
                passed  = false;

            if (targets) {

                // @TODO we need Node.some 
                targets.each(function (v, k) {

                    if ((!passed) && (v == target)) {
                        // Y.log('success');
                        Y.fire(ename, e);
                        passed = true;
                    }

                });

            }

        }, el);

        a[0] = ename;
        a.splice(3, 2);
            
        // subscribe to the custom event for the delegation spec
        return Y.on.apply(Y, a);

    }

};


})();