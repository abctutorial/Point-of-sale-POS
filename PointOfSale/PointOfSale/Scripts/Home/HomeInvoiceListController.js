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
                    $scope.Sale.SalesId = $scope.InvoiceCart[0].SalesId
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
        $scope.SetValueOfProduct = function (productId) {
            var dataObj = $filter('filter')($scope.ProductList, { ProductId: parseInt(productId) })[0];
            const index = $scope.InvoiceCart.findIndex((x) => x.ProductId === productId);
            $scope.InvoiceCart[index].CategoryName = dataObj.CategoryName;
            $scope.InvoiceCart[index].UnitPrice = dataObj.SalesPrice;
            $scope.InvoiceCart[index].LineTotal = $scope.InvoiceCart[index].UnitPrice * $scope.InvoiceCart[index].Quantity;
        }
        $scope.SubTotalCalculation = function () {
            $scope.Sale.Subtotal = 0;
            for (var i = 0; i < $scope.InvoiceCart.length; i++) {
                $scope.Sale.Subtotal = $scope.Sale.Subtotal + $scope.InvoiceCart[i].LineTotal;
            }
        }
        $scope.AddNewRow = function () {
            $scope.InvoiceCart.push({ ProductId: null, CategoryName: '', UnitPrice: 0, Quantity: 1, LineTotal: 0 });
        }
        $scope.RowDelete = function (index,salesDetailId) {
            if (index > -1) {
                $scope.InvoiceCart.splice(index, 1);
            }
            $scope.SubTotalCalculation();
            $scope.Deleted = []
            $scope.Deleted.push(salesDetailId);
        }
        $scope.CalculateDiscount = function () {
            $scope.Sale.DiscountAmount = ($scope.Sale.Subtotal * $scope.Sale.DiscountParcentage) / 100;
        }
        $scope.CalculateVat = function () {
            $scope.Sale.VatAmount = (($scope.Sale.Subtotal - $scope.Sale.DiscountAmount) * $scope.Sale.VatParcentage) / 100;
            $scope.Sale.TotalAmount = ($scope.Sale.Subtotal - $scope.Sale.DiscountAmount) + $scope.Sale.VatAmount;
            $scope.Sale.TotalAmout = ($scope.Sale.Subtotal - $scope.Sale.DiscountAmount) + $scope.Sale.VatAmount;
        }
        $scope.OnChangeLineTotalSet = function (productId) {
            const index = $scope.InvoiceCart.findIndex((x) => x.ProductId === productId);
            $scope.InvoiceCart[index].LineTotal = $scope.InvoiceCart[index].UnitPrice * $scope.InvoiceCart[index].Quantity;
        }
        $scope.EditInvoice = function () {
            var data = JSON.stringify({
                sale: $scope.Sale, salesDetails: $scope.InvoiceCart, deleted: $scope.Deleted
            });
            return $.ajax({
                contentType: 'application/json; charset=utf-8',
                dataType: 'json',
                type: 'POST',
                url: "/Home/EditInvoiceSale",
                data: data,
                success: function (result) {
                    if (result.IsSuccess == true) {

                        //Reset();
                        alert("Save Success!");
                    }
                    else {
                        alert("Save failed!");
                    }
                },
                error: function () {
                    alert("Error!")
                }
            });
        }
    });
}).call(angular);