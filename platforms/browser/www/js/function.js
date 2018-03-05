$(document).ready(function () {
    var donvi;
    $("input[name=donvi]:radio").change(function(){
        var temp = $('#donvi:checked').val();
        if ($('input[name=donvi]:checked').val() == 1){
            $('#maxdv').text('g');
            $('#phangiaidv').text('g');
        } else {
            $('#maxdv').text('Kg');
            $('#phangiaidv').text('Kg');
        }
    })
    $('#btnCal').click(function (e) {
        e.preventDefault();
        donvi = $('input[name=donvi]:checked').val();
        if(donvi == 1){
            dv = 'g';
        }
        else {
            dv = 'Kg';
        }
        $('#kqn').hide();
        $('#kqe').hide();
        $('#kqmin').hide();
        $('#sscp').text('');
        max = convertDV($('#max').val(),donvi);
        d = convertDV($('#dophangiai').val(), donvi);
        e = calE(d);
        n = calN(max,e);
        capchinhxac = calCapChinhXac(e,n);
        $('#kqn').show();
        $('#kqn').text('Số lần n : '+n+ ' ;');
        $('#kqe').show();
        $('#kqe').text('Độ chia kiểm e : '+uncovertDV(e,donvi)+dv);
        $('#kqmin').show();
        total = capchinhxac.length;
        $.each(capchinhxac, function (i,v) {
            if (v.ccx == 'I') {
                khoang1 = 50000*e + dv;
                khoang2 = 200000*e + dv;
            }
            if (v.ccx == 'II') {
                khoang1 = 5000*e + dv;
                khoang2 = 20000*e + dv;
                khoang3 = 100000*e +dv;
            }
            if (v.ccx == 'III') {
                khoang1 = 500*e + dv;
                khoang2 = 2000*e + dv;
                khoang3 = 10000*e +dv;
            }
            if (v.ccx == 'IV') {
                khoang1 = 50*e + dv;
                khoang2 = 200*e + dv;
                khoang3 = 1000*e +dv;
            }
            sscp1 = 0.5*e + dv;
            sscp2 = 1*e +dv;
            n = 1.5*e;
            sscp3 = n.toFixed(6) +dv;
            if (v.ccx == 'I') {
                str = 'Giá trị min : ' + v.min + dv + ' ; Cấp chính xác : ' + v.ccx + '<br>' + 'Từ 0 < m &#8804 ' + khoang1 + ' : sscp &#177 ' + sscp1 + '<br>' +
                    'Từ ' + khoang1 + ' < m &#8804 ' + khoang2 + ' : sscp &#177 ' + sscp2 + '<br>' +
                    'Từ ' + khoang2 + ' < m : sscp &#177 ' + sscp3;
            } else {
                str = 'Giá trị min : ' + v.min + dv + ' ; Cấp chính xác : ' + v.ccx + '<br>' + 'Từ 0 < m &#8804 ' + khoang1 + ' : sscp &#177 ' + sscp1 + '<br>' +
                    'Từ ' + khoang1 + ' < m &#8804 ' + khoang2 + ' : sscp &#177 ' + sscp2 + '<br>' +
                    'Từ ' + khoang2 + ' < m &#8804 ' + khoang3 + ': sscp &#177 ' + sscp3;
            }
            $('#sscp').append(str);
            if (i !== total - 1) {
                $('#sscp').append('<br>HOẶC<br>');
            }
        })

    })

    function calE(d){
        var min = d;
        var max = 10*d;
        if (d < 0.001) {
            return 0.001
        }
        if (d >= 1) {
            return d
        }
        for (i= -10; i++; i<=10) {
            result = Math.pow(10,i)
            if (result>min && result<=max ){
                return result;
            }
        }
    }
    function calN(max,e){
        return max/e;
    }

    function calCapChinhXac(e,n){
        var result = [];
        var temp1 = {ccx:"", min:"="};
        var temp2 = {ccx:"", min:"="};
        var temp3 = {ccx:"", min:"="};
        var temp4 = {ccx:"", min:"="};
        var temp5 = {ccx:"", min:"="};
        var temp6 = {ccx:"", min:"="};

        if ((e >= 0.001) && (n >= 50000)) {
            temp1['ccx'] = 'I';
            temp1['min'] = uncovertDV(100*d, donvi);
            result.push(temp1);
        }
        if ((e >= 0.001 && e <= 0.05) && (n >= 100 && n <= 100000)) {
            temp2['ccx'] = 'II';
            temp2['min'] = uncovertDV(20*d, donvi);
            result.push(temp2);
        }
        if ((e >= 0.1) && (n >= 5000 && n <= 100000)) {
            temp3['ccx'] = 'II';
            temp3['min'] = uncovertDV(50*d, donvi);
            result.push(temp3);
        }
        if ((e >= 0.1 && e <= 2) && (n >= 100 && n <= 10000)) {
            temp4['ccx'] = 'III';
            temp4['min'] = uncovertDV(20*d, donvi);
            result.push(temp4);
        }
        if ((e >= 5) && (n >= 500 && n <= 10000)) {
            temp5['ccx'] = 'III';
            temp5['min'] = uncovertDV(20*d, donvi);
            result.push(temp5);
        }
        if ((e >= 5) && (n >= 100 && n <= 1000)) {
            temp6['ccx'] = 'IV';
            temp6['min'] = uncovertDV(10*d, donvi);
            result.push(temp6);
        }
        return result;

    }
    function convertDV(number, dv){
        if (dv == 2){
            return number*1000;
        } else return number;
    }
    function uncovertDV(number, dv){
        if (dv == 2){
            return number/1000;
        } else return number;
    }
})