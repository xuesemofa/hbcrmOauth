$(document).ready(function() {
    dywh_page_dq_query();
});
function dywh_page_dq_query(){
    $('#dywh_page_dq_save_parents_select').find('option').remove();
    $('#dywh_page_dq_query_parents_select').find('option').remove();
    $('#dywh_page_dq_save_parents_select').append('<option value="">请选择</option>');
    $('#dywh_page_dq_query_parents_select').append('<option value="">请选择</option>');
    $.ajax({
        url: path+"/data/dywh/dywh/0",
        async: false,
        type: 'get',
        dataType: 'json',
        timeout: 1000,
        cache: false,
        success: function (req) {
            if(req.success){
                $(req.data).each(function(index,e){
                    $('#dywh_page_dq_save_parents_select').append('<option value="'+e.uuid+'">'+e.mc+'</option>');
                    $('#dywh_page_dq_query_parents_select').append('<option value="'+e.uuid+'">'+e.mc+'</option>');
                });
            }else{
                alert(req.message);
            }
        },
        error: erryFunction
    });
}
function dywh_page_dq_query2(){
    $('#dywh_page_dq_table_data').find('tr').remove();
    var t = $('#dywh_page_dq_query_parents_select').val();
    if(t == ""){
        alert('请选择省份');
        return false;
    }
    $.ajax({
        url: path+"/data/dywh/dywh/"+t,
        async: false,
        type: 'get',
        dataType: 'json',
        timeout: 1000,
        cache: false,
        success: function (req) {
            if(req.success){
                $(req.data).each(function(index,e){
                    $('#dywh_page_dq_table_data').append('<tr><td>'+(index+1)+'</td><td>'+e.mc+'</td><td><input class="btn btn-primary btn-xs" type="button" onclick="dywh_page_dq_delete(\''+e.uuid+'\')" value="删除"/><input class="btn btn-primary btn-xs" type="button" onclick="dywh_page_dq_update(\''+e.uuid+'\')" value="修改"/></td></tr>');
                });
            }else{
                alert(req.message);
            }
        },
        error: erryFunction
    });
}
function dywh_page_dq_delete(obj){
    var r=confirm("是否确定删除?");
    if(r){
        $.ajax({
            url: path+"/data/dywh/dywh/"+obj,
            async: false,
            type: 'delete',
            dataType: 'json',
            timeout: 1000,
            cache: false,
            success: function (req) {
                if(req.success){
                    dywh_page_dq_query2();
                }else{
                    alert(req.message);
                }
            },
            error: erryFunction
        });
    }
}
function dywh_page_dq_save(){
    $.ajax({
        url: path+"/data/dywh/dywh",
        async: false,
        type: 'post',
        data:$('#dywh_page_dq_save').serialize(),
        dataType: 'json',
        timeout: 1000,
        cache: false,
        success: function (req) {
            if(req.success){
                $('input[name="mc"]').val('');
                dywh_page_dq_query();
            }else{
                alert(req.message);
            }
        },
        error: erryFunction
    });
}

function dywh_page_dq_update(obj){
    $('#dywh_page_dq_update').click();
    $('#dywh_page_dq_update_uuid').val(obj);
}
function dywh_page_dq_update2(){
    $.ajax({
        url: path+"/data/dywh/dywh2",
        async: false,
        type: 'put',
        data:{"uuid":$('#dywh_page_dq_update_uuid').val(),"mc":$('#dywh_page_dq_update_mc').val()},
        dataType: 'json',
        timeout: 1000,
        cache: false,
        success: function (req) {
            if(req.success){
                alert(req.message);
                $('#dywh_page_dq_update').click();
                dywh_page_dq_query2();
            }else{
                alert(req.message);
            }
        },
        error: erryFunction
    });
}