// Custom jQuery
// ----------------------------------- 


(function(window, document, $, undefined){

  if ( ! $.fn.dataTable ) return;

  $(function(){

    //
    // Zero configuration
    //

    var datatable1;
    var datatable1_editor;

    datatable1_editor = new $.fn.DataTable.Editor ({
        ajax: {
            url: '/bla'
        },
        // display: 'bootstrap',
        table: '#datatable1',
        idSrc: 'id',
        data: 'id',
        fields: [ {
                name: 'engine'
            }, {
                name: 'browser'
            },{
                name: 'platform'
            },{
                name: 'version'
            },{
                name: 'grade'
            }
        ]
    });

    $('#datatable1').on( 'click', 'tbody td:not(:first-child)', function (e) {
        datatable1_editor.bubble( 
            this, {
                buttons: { 
                    label: '<em class="fa fa-edit"></em>', fn: function () { this.submit(); }
                }
            } )
    });

    datatable1 = $('#datatable1').dataTable({
        'paging':   true,  // Table pagination
        'ordering': true,  // Column ordering 
        'info':     true,  // Bottom left status text
        // Text translation options
        // Note the required keywords between underscores (e.g _MENU_)
        rowId: 'id',
        oLanguage: {
            sSearch:      'Search all columns:',
            sLengthMenu:  '_MENU_ records per page',
            info:         'Showing page _PAGE_ of _PAGES_',
            zeroRecords:  'Nothing found - sorry',
            infoEmpty:    'No records available',
            infoFiltered: '(filtered from _MAX_ total records)'
        },
        select: true,
        sAjaxSource: '/api/datatable_with_id',

        columns: [
            { data: 'engine' },
            { data: 'browser' },
            { data: 'platform' },
            { data: 'version' },
            { data: 'grade' }
        ],
        buttons: [ {
            extend: 'edit',
            editor: datatable1_editor
        } ]
    });


    // 
    // Filtering by Columns
    // 

    var dtInstance2 = $('#datatable2').dataTable({
        'paging':   true,  // Table pagination
        'ordering': true,  // Column ordering 
        'info':     true,  // Bottom left status text
        // Text translation options
        // Note the required keywords between underscores (e.g _MENU_)
        oLanguage: {
            sSearch:      'Search all columns:',
            sLengthMenu:  '_MENU_ records per page',
            info:         'Showing page _PAGE_ of _PAGES_',
            zeroRecords:  'Nothing found - sorry',
            infoEmpty:    'No records available',
            infoFiltered: '(filtered from _MAX_ total records)'
        }
    });
    var inputSearchClass = 'datatable_input_col_search';
    var columnInputs = $('tfoot .'+inputSearchClass);

    // On input keyup trigger filtering
    columnInputs
      .keyup(function () {
          dtInstance2.fnFilter(this.value, columnInputs.index(this));
      });


    // 
    // Column Visibilty Extension
    // 

    $('#datatable3').dataTable({
        'paging':   true,  // Table pagination
        'ordering': true,  // Column ordering 
        'info':     true,  // Bottom left status text
        // Text translation options
        // Note the required keywords between underscores (e.g _MENU_)
        oLanguage: {
            sSearch:      'Search all columns:',
            sLengthMenu:  '_MENU_ records per page',
            info:         'Showing page _PAGE_ of _PAGES_',
            zeroRecords:  'Nothing found - sorry',
            infoEmpty:    'No records available',
            infoFiltered: '(filtered from _MAX_ total records)'
        },
        // set columns options
        'aoColumns': [
            {'bVisible':false},
            {'bVisible':true},
            {'bVisible':true},
            {'bVisible':true},
            {'bVisible':true}
        ],
        sDom:      'C<"clear">lfrtip',
        colVis: {
            order: 'alfa',
            'buttonText': 'Show/Hide Columns'
        }
    });

    // 
    // AJAX
    // 

    $('#datatable4').dataTable({
        'paging':   true,  // Table pagination
        'ordering': true,  // Column ordering 
        'info':     true,  // Bottom left status text
        sAjaxSource: '/api/datatable',
        aoColumns: [
          { mData: 'engine' },
          { mData: 'browser' },
          { mData: 'platform' },
          { mData: 'version' },
          { mData: 'grade' }
        ]
    });
  });

})(window, document, window.jQuery);
