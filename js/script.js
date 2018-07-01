(function(){
    //register service worker
    if(!navigator.serviceWorker) return;

    navigator.serviceWorker.register('/Currency-Converter/sw.js').then(function(){
        console.log('Registered');
    }).catch(function () {
       console.log('Registration failed'); 
    });


    //fetch data from API
    let url = "https://free.currencyconverterapi.com/api/v5/currencies";
    $.get(url, function(data, status){
        if(status === 'success'){
           
            for (let item in data.results) {

                $('#c_from').append(
                    `<option value="`+ item +`" >`+ item +`</option>`
                );

                $('#c_to').append(
                    `<option value="` + item +`" >` + item + `</option>`
                );
                
            }
        }else{
            console.log('something seem to be wrong');
        }      
    });

    //get values from user input
    $('#convert').click(function () {
        const amount = $('#f_amount').val();
            if (amount == null || amount === '' ){
                alert('Enter amount ');
            } else{
               
                let fromCurrency = encodeURIComponent($('#c_from').val());
                let toCurrency = encodeURIComponent($('#c_to').val());
                var query = fromCurrency + '_' + toCurrency;        

                var urlResult = 'https://free.currencyconverterapi.com/api/v5/convert?q='
                    + query+'&compact=y';

                $.get(urlResult, function (data, status) {
                    if (status === 'success') {
                        let val = data[query].val;
                        let total = val * amount;
                        let result = total.toFixed(2);
                        $('#result').val(result);
                    } else {
                        console.log('something went wrong');
                    }

                });

            }        
    });

    //Store all queries



  

})();

