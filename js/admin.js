function Admin($scope,$http,$filter,$routeParams,$location,$route,$localStorage) {




  $scope.model = {}
  $scope.datamodel = {}

  $scope.check= true

  $scope.est = 'Mas Detalle'

	$http.get(host+"/marca/").success(function(response) {$scope.marcas = response;

    $scope.model.marca = $scope.marcas[73]

    console.log('marcas',$scope.marcas)

    });


  $http.get(host+"/listmodelo/").success(function(response) {$scope.modelos = response;

    $scope.model.modelo = $scope.modelos[40]

    });

    $http.get(host+"/listprimas/").success(function(response) {$scope.primas = response;
    });



  $http.get(host+"/listfinanase/").success(function(response) {$scope.listfinanase = response;
    });


  $http.get(host+"/listparametros/").success(function(response) {$scope.listparametros = response;

    //model.demision
    //model.igv

    console.log($scope.listparametros)

    $scope.model.demision = $scope.listparametros[0].d_emision
    $scope.model.igv = $scope.listparametros[0].igv
    $scope.model.aniox =0

    });

$scope.marcacheck = function(data){

  console.log(data.checkmarca)

  if(data.checkmarca){

    for(d in data) {

    data[d]['checkmodel'] = false

    }

  }

  else{

    for(d in data) {

    data[d]['checkmodel'] = true

    }


  }




}



  $http.get(host+"/aseguradoras/").success(function(response) {$scope.aseguradoras = response;

    $scope.model.aseguradora = $scope.aseguradoras[1]
    $scope.datamodel.aseguradora = $scope.aseguradoras[1]


    });

  $http.get(host+"/categorias/").success(function(response) {$scope.categorias = response;

     $scope.model.categoria = $scope.categorias[0]

    });



    $http.get(host+"/listafinance/").success(function(response) {$scope.listafinance = response;

      console.log('jsjsjs',response)

    });


  $http.get(host+"/programas/").success(function(response) {$scope.programas = response;

    $scope.model.programa = $scope.programas[16]

    });

  
  $http.get(host+"/coberturas/").success(function(response) {$scope.coberturas = response;

  });


$http.get(host+"/riesgosclase/").success(function(response) {$scope.man_riesgos = response;

  });

    $http.get(host+"/deducciones/").success(function(response) {$scope.deducciones = response;

    });

     $http.get(host+"/anio/").success(function(response) {$scope.anio = response;
      $scope.model.anio = $scope.anio[12]

    });

    $http.get(host+"/uso/").success(function(response) {$scope.uso = response;

       $scope.model.uso = $scope.uso[0]

      
    });

    $http.get(host+"/modalidad/").success(function(response) {$scope.modalidad = response;

      $scope.model.modalidad = $scope.modalidad[2]
    });



    $http.get(host+"/listgps/").success(function(response) {$scope.gps = response;

  
    });

      $http.get(host+"/clase/").success(function(response) {$scope.clases = response;




    });

    $http.get(host+"/man_cob/").success(function(response) {

      $scope.man_cob = response;
      $scope.man_cob_1 = response;

      
    });

     $http.get(host+"/deduc_cob/").success(function(response) {$scope.deduc_cob = response;

      
    });

       $http.get(host+"/man_serv/").success(function(response) {$scope.man_serv = response;

      
    });

       $http.get(host+"/man_autos/").success(function(response) {


        $scope.man_autos= response;
        $scope.man_autos_1= response;

      
    });

       $http.get(host+"/man_tasas/").success(function(response) {$scope.man_tasas = response;

      
    });

       $http.get(host+"/listaservice/").success(function(response) {$scope.listaservice = response;

      
    });

       $http.get(host+"/listafinanciamiento/").success(function(response) {$scope.listafinanciamiento = response;

      
    });

       $http.get(host+"/riesgos/").success(function(response) {$scope.riesgos = response;

        $scope.datamodel.riesgo = $scope.riesgos[3]
        $scope.model.riesgo = $scope.riesgos[3]
      
    });

    $scope.items = [{
    id: 1,
    label: 'Lima',
   
    }, {
    id: 2,
    label: 'Provincia',
  
    }];

    $scope.model.ubicacion = $scope.items[0]


    $scope.marca = function (model) {

      console.log(model)
      //{id_modelo__name_model: "C20", id_marca__name_marca: "FAW", valor: 0, id: 2712, id_clase__clase: "Pick-UP"}
      $scope.detalle = model.id_modelo__name_model+'|'+model.id_marca__name_marca+'|'+model.id_clase__clase
    }


    $scope.addigv = function (model) {

      console.log('addigv',model)

        $http({

        url: host+"/addigv/",
        data: model,
        method: 'POST',
     
        }).
        success(function(data) {


          $route.reload();

        })



  
    }

    $scope.modelitos= []

    $scope.traemodelo = function(data){


      console.log(data)



       $http.get(host+"/modelo/"+data.id_marca+'/').success(function(response) {$scope.modeloset = response;


      console.log($scope.modeloset[0].id_marca__name_marca)


      if (data.master == true){

        $scope.modeloset.checkmarcaprincipal = true
        $scope.modeloset.marca = $scope.modeloset[0].id_marca__name_marca
      
      }

      else{

        $scope.modeloset.checkmarcaprincipal = false 
        $scope.modeloset.marca = $scope.modeloset[0].id_marca__name_marca
     
      }



      con = $filter('filter')($scope.modelitos,{'marca' : $scope.modeloset[0].id_marca__name_marca}).length

      if(con==0){

      $scope.modelitos.push($scope.modeloset)

      }
      else{

        if(data.master == false){

          $filter('filter')($scope.modelitos,{'marca' : $scope.modeloset[0].id_marca__name_marca})[0].checkmarcaprincipal = false

        }

      }


      $scope.modelitos = $filter('filter')($scope.modelitos,{'checkmarcaprincipal' : true})

      console.log('Modelitos',$scope.modelitos)

      });



    }


    $scope.asegu = function (data) {

      d=data.name_asegurad

       $http.get(host+"/man_cob/").success(function(response) {$scope.man_cob = response;


      $scope.man_cob = $filter('filter')($scope.man_cob,d)

      console.log($scope.man_cob)

      
      });


    }

      function urlBase64Decode(str) {
        var output = str.replace('-', '+').replace('_', '/');
        switch (output.length % 4) {
            case 0:
                break;
            case 2:
                output += '==';
                break;
            case 3:
                output += '=';
                break;
            default:
                throw 'Illegal base64url string!';
        }
        return window.atob(output);
    }

    function getUserFromToken() {
        var token = $localStorage.token;
        var user = {};
        if (typeof token !== 'undefined') {
            var encoded = token.split('.')[1];
            user = JSON.parse(urlBase64Decode(encoded));
        }
        return user;
    }

     $scope.login = function (data) {

      console.log('ingresando',data)

       $http({

        url: "http://cotizador.hermes.pe:8000/api-token-auth/",
        data: data,
        method: 'POST'
        }).
        success(function(data) {
        
        console.log('returmmm',data.token)

        $localStorage.token = data.token;

        var currentUser = getUserFromToken();
        
        console.log('Decode',currentUser)

       })

      }


    $scope.addriesgoclase = function (datax) {

      console.log(datax)

       $http({

        url: host+"/addriesgoclase/",
        data: datax,
        method: 'POST',
     
        }).
        success(function(data) {


          $route.reload();

        })

    }

    $scope.ase = function (data) {

      d = data.aseguradora.name_asegurad


      $http.get(host+"/deduc_cob/").success(function(response) {$scope.deduc_cob = response;


      $scope.deduc_cob = $filter('filter')($scope.deduc_cob,d)

      console.log($scope.deduc_cob)

      
      });



    }



    $scope.add = function (model) {

    	console.log('queee...',model)

    	 $http({

        url: host+"/add/",
        data: model,
        method: 'POST',
     
        }).
        success(function(data) {


          $route.reload();

        })

    }

    $scope.eliminarcob = function (model) {

      console.log(model)

       $http({

        url: host+"/eliminarcob/",
        data: model,
        method: 'POST',
     
        }).
        success(function(data) {

          $route.reload();

        })
    }

       $scope.eliminarfin = function (model) {

      console.log(model)

       $http({

        url: host+"/eliminarfin/",
        data: model,
        method: 'POST',
     
        }).
        success(function(data) {

          $route.reload();

        })
    }

    

    $scope.eliminardedu = function (model) {

      console.log(model)

       $http({

        url: host+"/eliminardedu/",
        data: model,
        method: 'POST',
     
        }).
        success(function(data) {

         $route.reload();

        })
    }

    $scope.eliminarserv = function (model) {

      console.log(model)

       $http({

        url: host+"/eliminarserv/",
        data: model,
        method: 'POST',
     
        }).
        success(function(data) {

          $route.reload();

        })
    }

      $scope.eliminartasa = function (model) {

      console.log(model)

       $http({

        url: host+"/eliminartasa/",
        data: model,
        method: 'POST',
     
        }).
        success(function(data) {

          $route.reload();

        })
    }

      $scope.eliminarauto = function (model) {

         $('#eliminarauto').modal('hide')
        $('.modal-backdrop').remove();


      console.log(model)

       $http({

        url: host+"/eliminarauto/",
        data: model,
        method: 'POST',
     
        }).
        success(function(data) {

          $route.reload();

        })
    }

    

     $scope.eliminarries = function (model) {

      console.log(model)

       $http({

        url: host+"/eliminarries/",
        data: model,
        method: 'POST',
     
        }).
        success(function(data) {

          $route.reload();

        })
    }


    $scope.addtasa = function (model) {

      console.log(model)

       $http({

        url: host+"/addtasa/",
        data: model,
        method: 'POST',
     
        }).
        success(function(data) {

        $route.reload();

        })

    }

    $scope.addprograma = function (model) {

      $('#programa').modal('hide')
      $('.modal-backdrop').remove();

       $http({

        url: host+"/addprograma/",
        data: model,
        method: 'POST',
     
        }).
        success(function(data) {

        $route.reload();

        })

    }

    $scope.addprima = function (model) {

      $('#programa').modal('hide')
      $('.modal-backdrop').remove();

       $http({

        url: host+"/addprima/",
        data: model,
        method: 'POST',
     
        }).
        success(function(data) {

        $route.reload();

        })

    }

    $scope.addpoliticagps = function (model) {

      $('#programa').modal('hide')
      $('.modal-backdrop').remove();

      console.log('GPS....',model)

       $http({

        url: host+"/addpoliticagps/",
        data: model,
        method: 'POST',
     
        }).
        success(function(data) {

        $route.reload();

        })

    }


    $scope.adddeduccion = function (model) {

    	console.log(model)

    	 $http({

        url: host+"/adddeduccion/",
        data: model,
        method: 'POST',
     
        }).
        success(function(data) {

          $route.reload();

        })

    }

    $scope.addauto = function (model) {


      console.log(model)

       $http({

        url: host+"/addauto/",
        data: model,
        method: 'POST',
     
        }).
        success(function(data) {

          $route.reload();

        })

    }

    $scope.addmarca = function (model) {

      console.log(model)

       $('#marca').modal('hide')
      $('.modal-backdrop').remove();

       $http({

        url: host+"/addmarca/",
        data: model,
        method: 'POST',
     
        }).
        success(function(data) {

          $http.get(host+"/marca").success(function(response) {$scope.marcas = response;

    });

        })

    }


  $scope.addmodelo = function (model) {


      $('#modelo').modal('hide')
      $('.modal-backdrop').remove();

       $http({

        url: host+"/addmodelo/",
        data: model,
        method: 'POST',
     
        }).
        success(function(data) {

           $http.get(host+"/listmodelo").success(function(response) {$scope.modelos = response;

    });

        })

    }


  $scope.addclase = function (model) {

    $('#clase').modal('hide')
         $('.modal-backdrop').remove();

      console.log('model',model)

       $http({

        url: host+"/addclase/",
        data: model,
        method: 'POST',
     
        }).
        success(function(data) {

          $route.reload();

        })

    }




     $scope.parametros = function (model) {

      console.log(model)

       $http({

        url: host+"/parametros/",
        data: model,
        method: 'POST',
     
        }).
        success(function(data) {


        $route.reload();

        })

    }



       $scope.addservice = function (model) {

    	console.log(model)

    	 $http({

        url: host+"/addservice/",
        data: model,
        method: 'POST',
     
        }).
        success(function(data) {


         $route.reload();

        })

    }

    

    $scope.addaseguradora = function (model) {


         $('#aseguradora').modal('hide')
         $('.modal-backdrop').remove();

    	console.log(model)

    	$http({

        url: host+"/addaseguradora/",
        data: model,
        method: 'POST',
     
        }).
        success(function(data) {

    

          $route.reload();

        })

    }

       $scope.adduso = function (model) {


         $('#adduso').modal('hide')
         $('.modal-backdrop').remove();

    	console.log(model)

    	$http({

        url: host+"/adduso/",
        data: model,
        method: 'POST',
     
        }).
        success(function(data) {

          $route.reload();

        })

    }

     $scope.addcobertura = function (model) {

    	
         $('#addcobertura').modal('hide')
         $('.modal-backdrop').remove();

    	$http({

        url: host+"/addcobertura/",
        data: model,
        method: 'POST',
     
        }).
        success(function(data) {

          $route.reload();

        })

    }

         $scope.addmodalidad = function (model) {

    	
         $('#addmodalidad').modal('hide')
         $('.modal-backdrop').remove();

    	$http({

        url: host+"/addmodalidad/",
        data: model,
        method: 'POST',
     
        }).
        success(function(data) {

          $route.reload();

        })

    }

    $scope.addfinanciamiento =function(data){


      console.log('financiamiento....')


               $('#addmodalidad').modal('hide')
         $('.modal-backdrop').remove();

      $http({

        url: host+"/addfinanciamiento/",
        data: data,
        method: 'POST',
     
        }).
        success(function(data) {

          $route.reload();

        })





    }



         $scope.addriesgo = function (model) {

      
         $('#addriesgo').modal('hide')
         $('.modal-backdrop').remove();

      $http({

        url: host+"/addriesgo/",
        data: model,
        method: 'POST',
     
        }).
        success(function(data) {

          $route.reload();

        })

    }



        $scope.adddeducible = function (model) {

    	
         $('#adddeducible').modal('hide')
         $('.modal-backdrop').remove();

    	$http({

        url: host+"/adddeducible/",
        data: model,
        method: 'POST',
     
        }).
        success(function(data) {

          $route.reload();

        })

    }


        $scope.addservicio = function (model) {

      
         $('#adddeducible').modal('hide')
         $('.modal-backdrop').remove();

      $http({

        url: host+"/addservicio/",
        data: model,
        method: 'POST',
     
        }).
        success(function(data) {

          $route.reload();

        })

    }


    $scope.editauto = function (model) {

      console.log(model)
       $('#editauto').modal('hide')
         $('.modal-backdrop').remove();


       $http({

        url: host+"/editauto/",
        data: model,
        method: 'POST',
     
        }).
        success(function(data) {

          $http.get(host+"/man_autos").success(function(response) {$scope.man_autos= response;

      
    });

        })
   
    }




    $scope.editar = function (model) {



        $scope.edit =model

        console.log(model,$scope.clases)

   
    
        $scope.edit.uso = $scope.uso[model.id_uso-1]
       
        $scope.edit.aseguradora = $filter('filter')($scope.aseguradoras,{'id_asegurad' : model.id_aseg})[0]


        $scope.edit.modalidad = $scope.modalidad[model.modalidad-1]
        $scope.edit.anio = $scope.anio[model.anio-1]
        $scope.edit.programa = $scope.programas[model.programa-1]

        $scope.edit.clase = $filter('filter')($scope.clases,{'clase' : model.id_tipo__clase})[0]

        $scope.edit.categoria = $scope.categorias[model.categoria-1]
        $scope.edit.deduccion = $scope.deducciones[model.id_deduc-1]
        $scope.edit.cobertura = $scope.coberturas[model.id_cob-1]
        $scope.edit.servicio = $scope.listaservice[model.id_serv-1]
        //$scope.edit.riesgo = $scope.riesgos[model.riesgo-1]

        $scope.edit.riesgo = $filter('filter')($scope.riesgos,{'tipo_riesgo' : model.riesgo__tipo_riesgo})[0]


    }

    $scope.savecob = function (model) {

        console.log(model)

        $('#editcob').modal('hide')
        $('.modal-backdrop').remove();

        $http({

        url: host+"/savecob/",
        data: model,
        method: 'POST',
     
        }).
        success(function(data) {

          
    $http.get(host+"/man_cob/").success(function(response) {$scope.man_cob = response;

      
    });

        })



    }

    $scope.savededu = function (model) {

        console.log(model)

        $('#editdedu').modal('hide')
        $('.modal-backdrop').remove();

        $http({

        url: host+"/savededu/",
        data: model,
        method: 'POST',
        }).
        success(function(data) {

          location.reload()
        })
    }


     $scope.saveriesg = function (model) {

        console.log(model)

        $('#editriesg').modal('hide')
        $('.modal-backdrop').remove();

        $http({

        url: host+"/saveriesg/",
        data: model,
        method: 'POST',
        }).
        success(function(data) {

          $route.reload();

        })

    }

    $scope.sumasegurada = function(data){


      console.log('dgdgdgd',data.modelo.valor)

      if(data.modelo.valor>50000){

        data.value = 'Si'

      }
      else{

        data.value='No'
      }

      
      



    }

/*
    $scope.saveriesg = function (model) {

        console.log(model)

        $('#editriesg').modal('hide')
        $('.modal-backdrop').remove();

        $http({

        url: host+"/saveriesg/",
        data: model,
        method: 'POST',
        }).
        success(function(data) {

          $http.get(host+"/riesg_n/").success(function(response) {$scope.riesg_n = response;
    });
        })
    }
*/



     $scope.saveserv = function (model) {

        console.log(model)

        $('#editserv').modal('hide')
        $('.modal-backdrop').remove();

        $http({

        url: host+"/saveservicio/",
        data: model,
        method: 'POST',
        }).
        success(function(data) {

          $route.reload();

        })

    }



    $scope.savetasas = function (model) {

        console.log(model)

        $('#edittasa').modal('hide')
        $('.modal-backdrop').remove();

        $http({

        url: host+"/savetasa/",
        data: model,
        method: 'POST',
     
        }).
        success(function(data) {

           location.reload()

        })



    }



    $scope.search = function () {
    
 
        var output = {};


        obj = $filter('filter')($scope.man_cob,$scope.tipo)

        $scope.contador = ObjectLength(obj)


        $scope.man_cob = $filter('filter')($scope.man_cob,$scope.tipo);
        $scope.deduc_cob = $filter('filter')($scope.deduc_cob,$scope.tipo);
        $scope.man_serv = $filter('filter')($scope.man_serv,$scope.tipo);
        $scope.man_tasas = $filter('filter')($scope.man_tasas,$scope.tipo);

       

    };

    function ObjectLength( object ) {
    var length = 0;
    for( var key in object ) {
        if( object.hasOwnProperty(key) ) {
            ++length;
        }
    }
    return length;
    };


    $scope.sort_by = function(newSortingOrder) {
    

        function sortByKey(array, key) {
            return array.sort(function(a, b) {
            var x = a[key]; var y = b[key];
            return ((x < y) ? -1 : ((x > y) ? 1 : 0));
            });
        }

    
        if ($scope.sortingOrder == newSortingOrder)
            $scope.reverse = !$scope.reverse;

        $scope.sortingOrder = newSortingOrder;


        people = sortByKey($scope.man_cob, newSortingOrder);
        people_deduc_cob = sortByKey($scope.deduc_cob, newSortingOrder);
        people_man_serv = sortByKey($scope.man_serv, newSortingOrder);
        people_man_tasas = sortByKey($scope.man_cob, newSortingOrder);

        if ($scope.reverse){

            console.log($scope.reverse);
            people = sortByKey(people, newSortingOrder).reverse();
            people_deduc_cob = sortByKey(people_deduc_cob, newSortingOrder).reverse();
            people_man_serv = sortByKey(people_man_serv, newSortingOrder).reverse();
            people_man_tasas = sortByKey(people_man_tasas, newSortingOrder).reverse();
            
        }
  
        $scope.man_cob = people
        $scope.deduc_cob = people_deduc_cob
        $scope.man_serv = people_man_serv
        $scope.man_tasas = people_man_tasas

        $scope.search()

        // icon setup
        $('th i').each(function(){
            // icon reset
            $(this).removeClass().addClass('icon-sort');
        });
        if ($scope.reverse)
            $('th.'+newSortingOrder+' i').removeClass().addClass('icon-chevron-up');
        else
            $('th.'+newSortingOrder+' i').removeClass().addClass('icon-chevron-down');
    
    };









}