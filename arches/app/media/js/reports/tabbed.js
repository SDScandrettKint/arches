define([
    'jquery',
    'underscore',
    'knockout',
    'knockout-mapping',
    'viewmodels/report',
    'graph-designer-data',
    'bindings/chosen'
], function($, _, ko, koMapping, ReportViewModel, data) {
    return ko.components.register('tabbed-report', {
        viewModel: function(params) {
            params.configKeys = ['tabs', 'activeTabIndex'];
            ReportViewModel.apply(this, [params]);
            var self = this;
            if (this.activeTabIndex() > self.tabs().length - 1) {
                this.activeTabIndex(self.tabs().length - 1);
            }
            this.icons = data.icons;
            this.activeTab = ko.observable(self.tabs()[ko.unwrap(this.activeTabIndex)]);
            this.report.configJSON.subscribe(function(){
                if (self.tabs.indexOf(self.activeTab()) === -1) {
                    self.activeTab(self.tabs()[ko.unwrap(this.activeTabIndex)]);
                }
            });
            this.topcards = ko.unwrap(self.report.cards).map(function(card){
                return {name: card.model.name(), nodegroupid: card.nodegroupid};
            });

            this.setActiveTab = function(tabIndex){
                self.activeTabIndex(tabIndex);
                self.activeTab(self.tabs()[ko.unwrap(self.activeTabIndex)]);
            };

            this.activeCards = ko.computed(function() {
                var cardList = [];
                ko.unwrap(self.report.cards).forEach(function(card) {
                    if (self.activeTabIndex() !== undefined && self.tabs().length > 0) {
                        self.tabs()[self.activeTabIndex()]["nodegroup_ids"]().forEach( function(tabNodegroupId) {
                            if (card.nodegroupid === tabNodegroupId) {
                                cardList.push(card);
                            }
                        });
                    }
                });
                return cardList;
            });

            this.moveTab = function(v) {
                if (v.sourceIndex === self.activeTabIndex()) {
                    self.setActiveTab(v.targetIndex);
                }
            }

            this.addTab = function(){
                var newTab = koMapping.fromJS({
                    icon: '',
                    name: '',
                    nodegroup_ids: []
                });
                this.tabs.unshift(newTab);
                this.setActiveTab(0);
            };

            this.removeTab = function(tab){
                var index;
                if (this.tabs().length > 0) {
                    index = this.tabs.indexOf(tab) > 0 ? this.tabs.indexOf(tab) - 1 : 0;
                    this.setActiveTab(index);
                    this.tabs.remove(tab);
                }
            };

        },
        template: { require: 'text!report-templates/tabbed' }
    });
});
