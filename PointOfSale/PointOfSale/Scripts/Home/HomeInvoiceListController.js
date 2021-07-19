(function () {
    app.controller('HomeInvoiceList', function ($scope, $http, $filter) {
        $scope.Sale = new Object();
        $scope.list = true;
        $scope.invoice = false;
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
        $scope.ShowHideEdit = function () {
            $scope.list = $scope.list == true ? false : true;
            $scope.invoice = $scope.invoice == true ? false : true;
        }
        $scope.GetInvoiceSalesBySalesId = function (salesId) {
            $http.get('/Home/GetInvoiceBySalesId', { params: { salesId: salesId } })
                .then(function (response) {
                    var data = response.data;
                    $scope.SalesList = data;
                    $scope.Sale.OrderNo = $scope.SalesList[0].OrderNo;
                    $scope.Sale.CustomerName = $scope.SalesList[0].CustomerName;
                    $scope.Sale.CustomerAddress = $scope.SalesList[0].CustomerAddress;
                    $scope.Sale.CustomerPhone = parseInt($scope.SalesList[0].CustomerPhone);
                    $scope.Sale.Subtotal = $scope.SalesList[0].Subtotal;
                    $scope.Sale.DiscountParcentage = $scope.SalesList[0].DiscountParcentage;
              
                    $scope.Sale.VatParcentage = $scope.SalesList[0].VatParcentage;
          
                    $scope.Sale.TotalAmout = $scope.SalesList[0].TotalAmout;
                });
        }
    });
}).call(angular);