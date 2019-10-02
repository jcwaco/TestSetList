// This App is supposed to find Test Sets and then list the Test Cases within them
//
//
//A new comment is added
//
// Verify connector function
// Prepare to add pull requests
//
//
//This a Test of vcs connector 2.0.5
// 
//Creating a change in the code
//
//Her we go again
//
//
// Test the logistics

// A change for the better
// Added by JC

//
Ext.define('CustomApp', {
    extend: 'Rally.app.App',
    componentCls: 'app',
    items:{ html:'<a href="https://help.rallydev.com/apps/2.0rc3/doc/">App SDK 2.0rc3 Docs</a>'},
    launch: function() {
    		var deStore;

    		var panel1 = Ext.create( 'Ext.panel.Panel', {
    			layout : {
    				type : 'hbox', // Arrange child items vertically
    				align : 'middle', // Each takes up full width
    			},
    			width : '100%',
    			bodyPadding : 10,
    			bodyStyle : {
    				background : '#9A9494',
    			},
    			items : [
    					{
    						xtype : 'container',
    						itemId : 'iterationFilter'
    					}, {
    						xtype : 'rallybutton',
    						text : 'Print Summary',
    						handler : function () {
    							this._printSummary();
    						},
    						style : {
    							marginRight : '10px',
    							marginLeft : '10px'
    						},
    						// flex:'1',
    						scope : this
    					}
    			/*
    			 * { xtype:'rallybutton', text: 'Print Defects', handler: function() { this._printDefects(); }, style: { marginLeft: '10px' },
    			 * 
    			 * flex:'1', scope:this }
    			 */
    			]
    		} );
    		this.add( panel1 );
    		var panel2 = Ext.create( 'Ext.panel.Panel', {
    			layout : 'vbox',
    			width : '100%',
    			bodyPadding : 10,
    			bodyStyle : {
    				background : '#9A9494',
    			},
    			items : [

    				{
    					xtype : 'container',
    					layout : 'accordion',
    					itemId : 'testStatus',
    					width : '100%',
    					height : 500
    				}
    			]
    		} );

    		this.add( panel2 );
    		this._testSummary = [];
    		this._testResultList = [];
    		this._testSetTestList = [];
    		var TestSetStore;
    		var TestResultStore;
    		scope: this;

    		this.down( '#iterationFilter' ).add( {
    			xtype : 'rallyiterationcombobox',
    			itemId : 'iterationComboBox',
    			listeners : {
    				change : this._queryForTestSets,
    				ready : this._queryForTestSets,
    				scope : this
    			}
    		} );
    		;
    	},
    	_queryForTestSets : function () {

    		// if loading new iteration, destroy existing grids
    		if ( this._summaryGrid !== undefined ) {
    			this._summaryGrid.destroy();
    			this._Grid.destroy();
    			this._Grid2.destroy();
    		}

    		TestSetStore = Ext.create( 'Rally.data.WsapiDataStore', {
    			model : 'TestSet',
    			autoLoad : true,
    			storeId : 'TestSetStorer',
    			context : {
    				projectScopeUp : false,
    				projectScopeDown : true
    			},
    			filters : [
    					{
    						property : 'Project',
    						operator : '=',
    						value : this.getContext().getDataContext().project
    					}, {
    						property : 'Iteration.Name',
    						operator : '=',
    						value : this.down( '#iterationComboBox' ).getRecord().data.Name
    					}
    			],
    			fetch : [
    					'FormattedID', 'Name', 'TestCases', 'ObjectID', 'Project'
    			],
    			limit : 10000,
    			listeners : {
    				load : function ( store, data, success ) {
    					this._queryForTestResults( store, data )
    				},
    				scope : this
    			}
    		} );
    	},
});
