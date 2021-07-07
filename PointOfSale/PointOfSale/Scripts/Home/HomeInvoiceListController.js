(function () {
    app.controller('HomeInvoiceList', function ($scope, $http, $filter) {
        var init = function () {
            GetAllSales();
        }; //end of init
        init(); //init is called

        function GetAllSales() {
            $http.get('/Home/GetAllSales')
                .then(function (response) {
                    var data = response.data;
                    $scope.SalesList = data;
                });
        }
    });
}).call(angular);