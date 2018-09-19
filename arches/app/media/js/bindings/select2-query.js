define([
    'jquery',
    'knockout',
    'underscore',
    'select2'
], function($, ko, _) {
    ko.bindingHandlers.select2Query = {
        init: function(el, valueAccessor, allBindingsAccessor) {
            var allBindings = allBindingsAccessor().select2Query;
            var select2Config = ko.utils.unwrapObservable(allBindings.select2Config);
            select2Config = _.defaults(select2Config, {
                clickBubble: true,
                multiple: false,
                allowClear: true,
            });
            var value = select2Config.value;

            ko.utils.domNodeDisposal.addDisposeCallback(el, function() {
                $(el).select2('destroy');
            });

            var placeholder = select2Config.placeholder;
            if (ko.isObservable(placeholder)) {
                placeholder.subscribe(function(newItems) {
                    select2Config.placeholder = newItems;
                    $(el).select2("destroy").select2(select2Config);
                });
                select2Config.placeholder = select2Config.placeholder();
            }

            select2Config.value = value();
            $(el).select2(select2Config);

            $(el).select2("val", value());

            if (ko.unwrap(select2Config.disabled)) {
                $(el).select2("disable");
            }

            $(el).on("change", function(val) {
                if (val.val === "") {
                    val.val = null;
                }
                return value(val.val);
            });
            $(el).on("select2-opening", function() {
                if (select2Config.clickBubble) {
                    $(el).parent().trigger('click');
                }
            });

            if (typeof select2Config.onSelect === 'function') {
                $(el).on("select2-selecting", function(e) {
                    select2Config.onSelect(e.choice);
                });
            }

            value.subscribe(function(newVal) {
                select2Config.value = newVal;
                $(el).select2("val", newVal);
            }, this);
        }
    };

    return ko.bindingHandlers.select2;
});
