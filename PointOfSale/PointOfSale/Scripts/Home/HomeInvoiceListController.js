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
        function GetProducts() {
            $http.get('/Home/GetAllProduct')
                .then(function (response) {
                    var data = response.data;
                    $scope.ProductList = data;
                });
        }
        $scope.ShowHideEdit = function () {
            $scope.list = $scope.list == true ? false : true;
            $scope.invoice = $scope.invoice == true ? false : true;
        }
        $scope.GetInvoiceSalesBySalesId = function (salesId) {
            GetProducts();
            $http.get('/Home/GetInvoiceBySalesId', { params: { salesId: salesId } })
                .then(function (response) {
                    var data = response.data;
                    $scope.InvoiceCart = data;
                    $scope.Sale.OrderNo = $scope.InvoiceCart[0].OrderNo;
                    $scope.Sale.CustomerName = $scope.InvoiceCart[0].CustomerName;
                    $scope.Sale.CustomerAddress = $scope.InvoiceCart[0].CustomerAddress;
                    $scope.Sale.CustomerPhone = parseInt($scope.InvoiceCart[0].CustomerPhone);
                    $scope.Sale.Subtotal = $scope.InvoiceCart[0].Subtotal;
                    $scope.Sale.DiscountParcentage = $scope.InvoiceCart[0].DiscountParcentage;
              
                    $scope.Sale.VatParcentage = $scope.InvoiceCart[0].VatParcentage;
          
                    $scope.Sale.TotalAmout = $scope.InvoiceCart[0].TotalAmout;
                    $scope.CalculateDiscount();
                    $scope.CalculateVat();
                });
        }


        $scope.CalculateDiscount = function () {
            $scope.Sale.DiscountAmount = ($scope.Sale.Subtotal * $scope.Sale.DiscountParcentage) / 100;
        }
        $scope.CalculateVat = function () {
            $scope.Sale.VatAmount = (($scope.Sale.Subtotal - $scope.Sale.DiscountAmount) * $scope.Sale.VatParcentage) / 100;
            //$scope.Sale.TotalAmount = ($scope.Sale.Subtotal - $scope.Sale.DiscountAmount) + $scope.Sale.VatAmount;
            //$scope.Sale.TotalAmout = ($scope.Sale.Subtotal - $scope.Sale.DiscountAmount) + $scope.Sale.VatAmount;
        }
    });
}).call(angular);