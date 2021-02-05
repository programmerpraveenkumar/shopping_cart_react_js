
import { useEffect, useState } from 'react';
import './App.css';
import Menu from './Menu';
import {httpPost,httpPostwithToken} from './HttpConfig';
import {CartContextValue} from './ContextProvider';
import { Link } from 'react-router-dom';
function Home() {
	// const [sign_in_up_model,setsignin_up_model] = useState('')
	// const[mobile,setMobile] = useState('');
	// const[password,setPassword] = useState('');
	// const[respassword,setRePassword] = useState('');
	const [categoryList,setCategoryList] = useState([]);
	const [productList,setProductList] = useState([]);
	const [cartData,dispatch] = CartContextValue()
	useEffect(()=>{
		//TODO check user login
		getCategory();
		getCartApi()
	},[])
	// const signUpApi=()=>{
	// 	if(mobile == ""){
	// 		alert("Mobile should not be empty");
	// 		return;
	// 	}else if(name == ""){
	// 		alert("Name should not be empty");
	// 		return;
	// 	}else if(email == ""){
	// 		alert("Email should not be empty");
	// 		return;
	// 	}else if(password == ""){
	// 		alert("password should not be empty");
	// 		return;
	// 	}else if(respassword == ""){
	// 		alert("Repassword should not be empty");
	// 		return;
	// 	}else if(password == respassword){
	// 		alert("Password and Repassword should be same");
	// 		return;
	// 	}
	// 	let jsonOBj ={ 
	// 			"name":name,
	// 			"mobile":mobile,
	// 			"password":password ,
	// 			"email":email
	// 		}
				
	// 	httpPost("signup/user",jsonOBj)
	// 	.then(res => res.json())
	// 	.then((res)=>{
	// 		if(res.hasOwnProperty('id')){
	// 			alert("Registration success.please sign in");
	// 			setMobile('');
	// 			setPassword('');
	// 			setRePassword("");
	// 			setEmail("")
	// 			setName('');
	// 			setsignin_up_model('sign-in')//hide the sign up model.
	// 		}else{
	// 			alert(res['message']);	
	// 		}
			
	// 		//console.log(res);
			
	// 	},error=>{
	// 		alert(error.message);
	// 	}
	// 	)
	// }
	const getCartApi = ()=>{		
		httpPostwithToken("addtocart/getCartsByUserId",{})
		.then((res)=>{				
			res.json() .then(data=>{
				if(res.ok){
					dispatch({
						"type":"add_cart",
						"data":data
					})
					//alert("Successfully added..")
				}else{
					alert(data.message)
				}
			})
		},error=>{
			alert(error.message);
		}
		)
	}
	const addCartApi=(productObj)=>{
		let obj = {
			"productId":productObj.id,			
			"qty":"1",
			"price":productObj.price
			
		}
		httpPostwithToken("addtocart/addProduct",obj)
		.then((res)=>{		
			res.json() .then(data=>{
				if(res.ok){
					dispatch({
						"type":"add_cart",
						"data":data
					})
					alert("Successfully added..")
				}else{
					alert(data.message)
				}
			})     
		}).catch(function(res){
			console.log("Error ",res);
			//alert(error.message);
		}
		)
	}
	const getCategory = ()=>{
		httpPostwithToken("product/getAllCategory",{}).
		then((res)=>{
			res.json().then(response=>{
				if(res.ok){
					setCategoryList(response);
					getProductsByCategory(response[0].id);
				}else{
					alert("Error in category api..")
				}
			})
			
			
		})
	}
	const getProductsByCategory = (cat_id)=>{
		let obj = {
			"cat_id":cat_id
		}
		
		httpPostwithToken("product/getProductsByCategory",obj)
		.then((res)=>{
			res.json().then(response=>{
				if(res.ok){
					if(response.length > 0){
						setProductList(response)
					}else{
						alert("No product found..");	
					}
				}else{
					setProductList([])
					alert("No product found..");
				}
			})
		},error=>{
			alert(error.message);
		}
		)
	}
	// const addCart=(productObj)=>{
	// 	//TODO Add cart implementation..
	// 	console.log(productObj)
	// }
	// const loginApi = ()=>{
	// 	if(mobile == ""){
	// 		alert("Mobile should not be empty");
	// 		return;
	// 	}else if(password == ""){
	// 		alert("password should not be empty");
	// 		return;
	// 	}
	// 	let jsonOBj = {"mobile":mobile,"password":password }
		
	// 	httpPost("login/user",jsonOBj)
	// 	.then(res => res.json())
	// 	.then((res)=>{
	// 		if(res['token'] != null){
	// 			localStorage.setItem("token",res['token']);//token
	// 			localStorage.setItem("user_id",res['user_profile_details']['user_id']);//user_id
	// 			setsignin_up_model('')//hide the sign up model.
	// 			getCategory();
	// 		}else{
	// 			alert(res['message']);	
	// 		}
			
	// 		//console.log(res);
			
	// 	},error=>{
	// 		alert(error.message);
	// 	}
	// 	)
	// }
  return (
    <div>
   	

  <div className="banner">
		<div className="container">
			<h3>Electronic Store, <span>Special Offers</span></h3>
		</div>
	</div>

	<div className="banner-bottom">
		<div className="container">
			<div className="col-md-5 wthree_banner_bottom_left">
				<div className="video-img">
					<a className="play-icon popup-with-zoom-anim" href="#small-dialog">
						<span className="glyphicon glyphicon-expand" aria-hidden="true"></span>
					</a>
				</div> 
			</div>
      <div className="col-md-7 wthree_banner_bottom_right">
				<div className="bs-example bs-example-tabs" role="tabpanel" data-example-id="togglable-tabs">
					<ul id="myTab" className="nav nav-tabs" role="tablist">
						{
							categoryList.map((category)=>(
								<li  onClick={(e)=>getProductsByCategory(category.id)} key={category.id} role="presentation">
									<a href="javascript:void(0)">{category.name}</a>
								</li>
							))
						}
						
						
					</ul>
					<div id="myTabContent" className="tab-content">
						<div role="tabpanel" className="tab-pane fade active in" id="home" aria-labelledby="home-tab">
							<div className="agile_ecommerce_tabs">
								{
									productList.map((product)=>(

										<div className="col-md-4 agile_ecommerce_tab_left">
											<div className="hs-wrapper">
												<img src="../assets/images/3.jpg" alt=" " className="img-responsive" />
												<img src="../assets/images/4.jpg" alt=" " className="img-responsive" />
												
												<div className="w3_hs_bottom">
													<ul>
														<li>
															<a href="#" data-toggle="modal" data-target="#myModal">
																<span className="glyphicon glyphicon-eye-open" aria-hidden="true"></span></a>
														</li>
													</ul>
												</div>
											</div> 
											<h5>
											<Link to={"/product/"+product.id}>{product.name}</Link>

																						
											</h5>
											<h5><a onClick={()=>addCartApi(product)} href="javascript:void(0)">Add Cart</a></h5>
											<div className="simpleCart_shelfItem">
												<p><i className="item_price">Rs.{product.price}</i></p>
											</div>
								</div>
									))
								}
								
								{/* <div className="col-md-4 agile_ecommerce_tab_left">
									<div className="hs-wrapper">
										<img src="../assets/images/4.jpg" alt=" " className="img-responsive" />
										<img src="../assets/images/5.jpg" alt=" " className="img-responsive" />
										<img src="../assets/images/6.jpg" alt=" " className="img-responsive" />
										<img src="../assets/images/7.jpg" alt=" " className="img-responsive" />
										<img src="../assets/images/3.jpg" alt=" " className="img-responsive" />
										<img src="../assets/images/4.jpg" alt=" " className="img-responsive" />
										<img src="../assets/images/5.jpg" alt=" " className="img-responsive" />
										<img src="../assets/images/6.jpg" alt=" " className="img-responsive" />
										<div className="w3_hs_bottom">
											<ul>
												<li>
													<a href="#" data-toggle="modal" data-target="#myModal"><span className="glyphicon glyphicon-eye-open" aria-hidden="true"></span></a>
												</li>
											</ul>
										</div>
									</div>
									<h5><a href="single.html">Mobile Phone2</a></h5>
									<div className="simpleCart_shelfItem">
										<p><span>$330</span> <i className="item_price">$302</i></p>
										<form action="#" method="post">
											<input type="hidden" name="cmd" value="_cart" />
											<input type="hidden" name="add" value="1" /> 
											<input type="hidden" name="w3ls_item" value="Mobile Phone2" /> 
											<input type="hidden" name="amount" value="302.00" />   
											<button type="submit" className="w3ls-cart">Add to cart</button>
										</form>
									</div>
								</div> 
								<div className="col-md-4 agile_ecommerce_tab_left">
									<div className="hs-wrapper">
										<img src="../assets/images/7.jpg" alt=" " className="img-responsive" />
										<img src="../assets/images/6.jpg" alt=" " className="img-responsive" />
										<img src="../assets/images/4.jpg" alt=" " className="img-responsive" />
										<img src="../assets/images/3.jpg" alt=" " className="img-responsive" />
										<img src="../assets/images/5.jpg" alt=" " className="img-responsive" />
										<img src="../assets/images/7.jpg" alt=" " className="img-responsive" />
										<img src="../assets/images/4.jpg" alt=" " className="img-responsive" />
										<img src="../assets/images/6.jpg" alt=" " className="img-responsive" />
										<div className="w3_hs_bottom">
											<ul>
												<li>
													<a href="#" data-toggle="modal" data-target="#myModal"><span className="glyphicon glyphicon-eye-open" aria-hidden="true"></span></a>
												</li>
											</ul>
										</div>
									</div>
									<h5><a href="single.html">Mobile Phone3</a></h5>
									<div className="simpleCart_shelfItem">
										<p><span>$250</span> <i className="item_price">$245</i></p>
										<form action="#" method="post">
											<input type="hidden" name="cmd" value="_cart" />
											<input type="hidden" name="add" value="1" /> 
											<input type="hidden" name="w3ls_item" value="Mobile Phone3" /> 
											<input type="hidden" name="amount" value="245.00"/>   
											<button type="submit" className="w3ls-cart">Add to cart</button>
										</form>
									</div>
								</div>*/}
								<div className="clearfix"> </div>
							</div>
						</div>
						<div role="tabpanel" className="tab-pane fade" id="audio" aria-labelledby="audio-tab">
							<div className="agile_ecommerce_tabs">
								<div className="col-md-4 agile_ecommerce_tab_left">
									<div className="hs-wrapper">
										<img src="../assets/images/8.jpg" alt=" " className="img-responsive" />
										<img src="../assets/images/9.jpg" alt=" " className="img-responsive" />
										<img src="../assets/images/10.jpg" alt=" " className="img-responsive" />
										<img src="../assets/images/8.jpg" alt=" " className="img-responsive" />
										<img src="../assets/images/9.jpg" alt=" " className="img-responsive" />
										<img src="../assets/images/10.jpg" alt=" " className="img-responsive" />
										<img src="../assets/images/8.jpg" alt=" " className="img-responsive" />
										<img src="../assets/images/9.jpg" alt=" " className="img-responsive" />
										<div className="w3_hs_bottom">
											<ul>
												<li>
													<a href="#" data-toggle="modal" data-target="#myModal1"><span className="glyphicon glyphicon-eye-open" aria-hidden="true"></span></a>
												</li>
											</ul>
										</div>
									</div>
									<h5><a href="single.html">Speakers</a></h5>
										<p><span>$320</span> <i className="item_price">$250</i></p>
									<div className="simpleCart_shelfItem">
										<form action="#" method="post">
											<input type="hidden" name="cmd" value="_cart" />
											<input type="hidden" name="add" value="1" /> 
											<input type="hidden" name="w3ls_item" value="Speakers" /> 
											<input type="hidden" name="amount" value="250.00" />   
											<button type="submit" className="w3ls-cart">Add to cart</button>
										</form>
									</div>
								</div>
								<div className="col-md-4 agile_ecommerce_tab_left">
									<div className="hs-wrapper">
										<img src="../assets/images/9.jpg" alt=" " className="img-responsive" />
										<img src="../assets/images/8.jpg" alt=" " className="img-responsive" />
										<img src="../assets/images/10.jpg" alt=" " className="img-responsive" />
										<img src="../assets/images/8.jpg" alt=" " className="img-responsive" />
										<img src="../assets/images/9.jpg" alt=" " className="img-responsive" />
										<img src="../assets/images/10.jpg" alt=" " className="img-responsive" />
										<img src="../assets/images/8.jpg" alt=" " className="img-responsive" />
										<img src="../assets/images/9.jpg" alt=" " className="img-responsive" />
										<div className="w3_hs_bottom">
											<ul>
												<li>
													<a href="#" data-toggle="modal" data-target="#myModal1"><span className="glyphicon glyphicon-eye-open" aria-hidden="true"></span></a>
												</li>
											</ul>
										</div>
									</div>
									<h5><a href="single.html">Headphones</a></h5>
									<div className="simpleCart_shelfItem">
										<p><span>$180</span> <i className="item_price">$150</i></p>
										<form action="#" method="post">
											<input type="hidden" name="cmd" value="_cart" />
											<input type="hidden" name="add" value="1" /> 
											<input type="hidden" name="w3ls_item" value="Headphones" /> 
											<input type="hidden" name="amount" value="150.00" />   
											<button type="submit" className="w3ls-cart">Add to cart</button>
										</form>
									</div>
								</div>
								<div className="col-md-4 agile_ecommerce_tab_left">
									<div className="hs-wrapper">
										<img src="../assets/images/10.jpg" alt=" " className="img-responsive" />
										<img src="../assets/images/8.jpg" alt=" " className="img-responsive" />
										<img src="../assets/images/9.jpg" alt=" " className="img-responsive" />
										<img src="../assets/images/8.jpg" alt=" " className="img-responsive" />
										<img src="../assets/images/9.jpg" alt=" " className="img-responsive" />
										<img src="../assets/images/10.jpg" alt=" " className="img-responsive" />
										<img src="../assets/images/8.jpg" alt=" " className="img-responsive" />
										<img src="../assets/images/9.jpg" alt=" " className="img-responsive" />
										<div className="w3_hs_bottom">
											<ul>
												<li>
													<a href="#" data-toggle="modal" data-target="#myModal1"><span className="glyphicon glyphicon-eye-open" aria-hidden="true"></span></a>
												</li>
											</ul>
										</div>
									</div>
									<h5><a href="single.html">Audio Player</a></h5>
									<div className="simpleCart_shelfItem">
										<p><span>$220</span> <i className="item_price">$180</i></p>
										<form action="#" method="post">
											<input type="hidden" name="cmd" value="_cart" />
											<input type="hidden" name="add" value="1" /> 
											<input type="hidden" name="w3ls_item" value="Audio Player" /> 
											<input type="hidden" name="amount" value="180.00"/>   
											<button type="submit" className="w3ls-cart">Add to cart</button>
										</form>
									</div>
								</div>
								<div className="clearfix"> </div>
							</div>
						</div>
						<div role="tabpanel" className="tab-pane fade" id="video" aria-labelledby="video-tab">
							<div className="agile_ecommerce_tabs">
								<div className="col-md-4 agile_ecommerce_tab_left">
									<div className="hs-wrapper">
										<img src="../assets/images/11.jpg" alt=" " className="img-responsive" />
										<img src="../assets/images/12.jpg" alt=" " className="img-responsive" />
										<img src="../assets/images/13.jpg" alt=" " className="img-responsive" />
										<img src="../assets/images/11.jpg" alt=" " className="img-responsive" />
										<img src="../assets/images/12.jpg" alt=" " className="img-responsive" />
										<img src="../assets/images/13.jpg" alt=" " className="img-responsive" />
										<img src="../assets/images/11.jpg" alt=" " className="img-responsive" />
										<img src="../assets/images/12.jpg" alt=" " className="img-responsive" />
										<div className="w3_hs_bottom">
											<ul>
												<li>
													<a href="#" data-toggle="modal" data-target="#myModal2"><span className="glyphicon glyphicon-eye-open" aria-hidden="true"></span></a>
												</li>
											</ul>
										</div>
									</div>
									<h5><a href="single.html">Laptop</a></h5>
									<div className="simpleCart_shelfItem">
										<p><span>$880</span> <i className="item_price">$850</i></p>
										<form action="#" method="post">
											<input type="hidden" name="cmd" value="_cart" />
											<input type="hidden" name="add" value="1" /> 
											<input type="hidden" name="w3ls_item" value="Laptop" /> 
											<input type="hidden" name="amount" value="850.00" />   
											<button type="submit" className="w3ls-cart">Add to cart</button>
										</form>
									</div>
								</div>
								<div className="col-md-4 agile_ecommerce_tab_left">
									<div className="hs-wrapper">
										<img src="../assets/images/12.jpg" alt=" " className="img-responsive" />
										<img src="../assets/images/11.jpg" alt=" " className="img-responsive" />
										<img src="../assets/images/13.jpg" alt=" " className="img-responsive" />
										<img src="../assets/images/11.jpg" alt=" " className="img-responsive" />
										<img src="../assets/images/12.jpg" alt=" " className="img-responsive" />
										<img src="../assets/images/13.jpg" alt=" " className="img-responsive" />
										<img src="../assets/images/11.jpg" alt=" " className="img-responsive" />
										<img src="../assets/images/12.jpg" alt=" " className="img-responsive" />
										<div className="w3_hs_bottom">
											<ul>
												<li>
													<a href="#" data-toggle="modal" data-target="#myModal2"><span className="glyphicon glyphicon-eye-open" aria-hidden="true"></span></a>
												</li>
											</ul>
										</div>
									</div>
									<h5><a href="single.html">Notebook</a></h5>
									<div className="simpleCart_shelfItem">
										<p><span>$290</span> <i className="item_price">$280</i></p>
										<form action="#" method="post">
											<input type="hidden" name="cmd" value="_cart" />
											<input type="hidden" name="add" value="1" /> 
											<input type="hidden" name="w3ls_item" value="Notebook" /> 
											<input type="hidden" name="amount" value="280.00" />   
											<button type="submit" className="w3ls-cart">Add to cart</button>
										</form>
									</div>
								</div>
								<div className="col-md-4 agile_ecommerce_tab_left">
									<div className="hs-wrapper">
										<img src="../assets/images/13.jpg" alt=" " className="img-responsive" />
										<img src="../assets/images/11.jpg" alt=" " className="img-responsive" />
										<img src="../assets/images/12.jpg" alt=" " className="img-responsive" />
										<img src="../assets/images/11.jpg" alt=" " className="img-responsive" />
										<img src="../assets/images/12.jpg" alt=" " className="img-responsive" />
										<img src="../assets/images/13.jpg" alt=" " className="img-responsive" />
										<img src="../assets/images/11.jpg" alt=" " className="img-responsive" />
										<img src="../assets/images/12.jpg" alt=" " className="img-responsive" />
										<div className="w3_hs_bottom">
											<ul>
												<li>
													<a href="#" data-toggle="modal" data-target="#myModal2"><span className="glyphicon glyphicon-eye-open" aria-hidden="true"></span></a>
												</li>
											</ul>
										</div>
									</div>
									<h5><a href="single.html">Kid's Toy</a></h5>
									<div className="simpleCart_shelfItem">
										<p><span>$120</span> <i className="item_price">$80</i></p>
										<form action="#" method="post">
											<input type="hidden" name="cmd" value="_cart" />
											<input type="hidden" name="add" value="1" /> 
											<input type="hidden" name="w3ls_item" value="Kid's Toy" /> 
											<input type="hidden" name="amount" value="80.00" />   
											<button type="submit" className="w3ls-cart">Add to cart</button>
										</form>
									</div>
								</div>
								<div className="clearfix"> </div>
							</div>
						</div>
						<div role="tabpanel" className="tab-pane fade" id="tv" aria-labelledby="tv-tab">
							<div className="agile_ecommerce_tabs">
								<div className="col-md-4 agile_ecommerce_tab_left">
									<div className="hs-wrapper">
										<img src="../assets/images/14.jpg" alt=" " className="img-responsive" />
										<img src="../assets/images/15.jpg" alt=" " className="img-responsive" />
										<img src="../assets/images/16.jpg" alt=" " className="img-responsive" />
										<img src="../assets/images/14.jpg" alt=" " className="img-responsive" />
										<img src="../assets/images/15.jpg" alt=" " className="img-responsive" />
										<img src="../assets/images/16.jpg" alt=" " className="img-responsive" />
										<img src="../assets/images/14.jpg" alt=" " className="img-responsive" />
										<img src="../assets/images/15.jpg" alt=" " className="img-responsive" />
										<div className="w3_hs_bottom">
											<ul>
												<li>
													<a href="#" data-toggle="modal" data-target="#myModal3"><span className="glyphicon glyphicon-eye-open" aria-hidden="true"></span></a>
												</li>
											</ul>
										</div>
									</div>
									<h5><a href="single.html">Refrigerator</a></h5>
									<div className="simpleCart_shelfItem">
										<p><span>$950</span> <i className="item_price">$820</i></p>
										<form action="#" method="post">
											<input type="hidden" name="cmd" value="_cart" />
											<input type="hidden" name="add" value="1" /> 
											<input type="hidden" name="w3ls_item" value="Refrigerator" /> 
											<input type="hidden" name="amount" value="820.00" />   
											<button type="submit" className="w3ls-cart">Add to cart</button>
										</form>
									</div>
								</div>
								<div className="col-md-4 agile_ecommerce_tab_left">
									<div className="hs-wrapper">
										<img src="../assets/images/15.jpg" alt=" " className="img-responsive" />
										<img src="../assets/images/14.jpg" alt=" " className="img-responsive" />
										<img src="../assets/images/16.jpg" alt=" " className="img-responsive" />
										<img src="../assets/images/14.jpg" alt=" " className="img-responsive" />
										<img src="../assets/images/15.jpg" alt=" " className="img-responsive" />
										<img src="../assets/images/16.jpg" alt=" " className="img-responsive" />
										<img src="../assets/images/14.jpg" alt=" " className="img-responsive" />
										<img src="../assets/images/15.jpg" alt=" " className="img-responsive" />
										<div className="w3_hs_bottom">
											<ul>
												<li>
													<a href="#" data-toggle="modal" data-target="#myModal3"><span className="glyphicon glyphicon-eye-open" aria-hidden="true"></span></a>
												</li>
											</ul>
										</div>
									</div>
									<h5><a href="single.html">LED Tv</a></h5>
									<div className="simpleCart_shelfItem">
										<p><span>$700</span> <i className="item_price">$680</i></p>
										<form action="#" method="post">
											<input type="hidden" name="cmd" value="_cart" />
											<input type="hidden" name="add" value="1" /> 
											<input type="hidden" name="w3ls_item" value="LED Tv"/> 
											<input type="hidden" name="amount" value="680.00"/>   
											<button type="submit" className="w3ls-cart">Add to cart</button>
										</form>
									</div>
								</div>
								<div className="col-md-4 agile_ecommerce_tab_left">
									<div className="hs-wrapper">
										<img src="../assets/images/16.jpg" alt=" " className="img-responsive" />
										<img src="../assets/images/14.jpg" alt=" " className="img-responsive" />
										<img src="../assets/images/15.jpg" alt=" " className="img-responsive" />
										<img src="../assets/images/14.jpg" alt=" " className="img-responsive" />
										<img src="../assets/images/15.jpg" alt=" " className="img-responsive" />
										<img src="../assets/images/16.jpg" alt=" " className="img-responsive" />
										<img src="../assets/images/14.jpg" alt=" " className="img-responsive" />
										<img src="../assets/images/15.jpg" alt=" " className="img-responsive" />
										<div className="w3_hs_bottom">
											<ul>
												<li>
													<a href="#" data-toggle="modal" data-target="#myModal3"><span className="glyphicon glyphicon-eye-open" aria-hidden="true"></span></a>
												</li>
											</ul>
										</div>
									</div>
									<h5><a href="single.html">Washing Machine</a></h5>
									<div className="simpleCart_shelfItem">
										<p><span>$520</span> <i className="item_price">$510</i></p>
										<form action="#" method="post">
											<input type="hidden" name="cmd" value="_cart" />
											<input type="hidden" name="add" value="1" /> 
											<input type="hidden" name="w3ls_item" value="Washing Machine" /> 
											<input type="hidden" name="amount" value="510.00" />   
											<button type="submit" className="w3ls-cart">Add to cart</button>
										</form>
									</div>
								</div>
								<div className="clearfix"> </div>
							</div>
						</div>
						<div role="tabpanel" className="tab-pane fade" id="kitchen" aria-labelledby="kitchen-tab">
							<div className="agile_ecommerce_tabs">
								<div className="col-md-4 agile_ecommerce_tab_left">
									<div className="hs-wrapper">
										<img src="../assets/images/17.jpg" alt=" " className="img-responsive" />
										<img src="../assets/images/18.jpg" alt=" " className="img-responsive" />
										<img src="../assets/images/19.jpg" alt=" " className="img-responsive" />
										<img src="../assets/images/17.jpg" alt=" " className="img-responsive" />
										<img src="../assets/images/18.jpg" alt=" " className="img-responsive" />
										<img src="../assets/images/19.jpg" alt=" " className="img-responsive" />
										<img src="../assets/images/17.jpg" alt=" " className="img-responsive" />
										<img src="../assets/images/18.jpg" alt=" " className="img-responsive" />
										<div className="w3_hs_bottom">
											<ul>
												<li>
													<a href="#" data-toggle="modal" data-target="#myModal4"><span className="glyphicon glyphicon-eye-open" aria-hidden="true"></span></a>
												</li>
											</ul>
										</div>
									</div>
									<h5><a href="single.html">Grinder</a></h5>
									<div className="simpleCart_shelfItem">
										<p><span>$460</span> <i className="item_price">$450</i></p>
										<form action="#" method="post">
											<input type="hidden" name="cmd" value="_cart" />
											<input type="hidden" name="add" value="1" /> 
											<input type="hidden" name="w3ls_item" value="Grinder" /> 
											<input type="hidden" name="amount" value="450.00" />   
											<button type="submit" className="w3ls-cart">Add to cart</button>
										</form>
									</div>
								</div>
								<div className="col-md-4 agile_ecommerce_tab_left">
									<div className="hs-wrapper">
										<img src="../assets/images/18.jpg" alt=" " className="img-responsive" />
										<img src="../assets/images/17.jpg" alt=" " className="img-responsive" />
										<img src="../assets/images/19.jpg" alt=" " className="img-responsive" />
										<img src="../assets/images/17.jpg" alt=" " className="img-responsive" />
										<img src="../assets/images/18.jpg" alt=" " className="img-responsive" />
										<img src="../assets/images/19.jpg" alt=" " className="img-responsive" />
										<img src="../assets/images/17.jpg" alt=" " className="img-responsive" />
										<img src="../assets/images/18.jpg" alt=" " className="img-responsive" />
										<div className="w3_hs_bottom">
											<ul>
												<li>
													<a href="#" data-toggle="modal" data-target="#myModal4"><span className="glyphicon glyphicon-eye-open" aria-hidden="true"></span></a>
												</li>
											</ul>
										</div>
									</div>
									<h5><a href="single.html">Water Purifier</a></h5>
									<div className="simpleCart_shelfItem">
										<p><span>$390</span> <i className="item_price">$350</i></p>
										<form action="#" method="post">
											<input type="hidden" name="cmd" value="_cart" />
											<input type="hidden" name="add" value="1" /> 
											<input type="hidden" name="w3ls_item" value="Water Purifier" /> 
											<input type="hidden" name="amount" value="350.00" />   
											<button type="submit" className="w3ls-cart">Add to cart</button>
										</form>
									</div>
								</div>
								<div className="col-md-4 agile_ecommerce_tab_left">
									<div className="hs-wrapper">
										<img src="../assets/images/19.jpg" alt=" " className="img-responsive" />
										<img src="../assets/images/17.jpg" alt=" " className="img-responsive" />
										<img src="../assets/images/18.jpg" alt=" " className="img-responsive" />
										<img src="../assets/images/17.jpg" alt=" " className="img-responsive" />
										<img src="../assets/images/18.jpg" alt=" " className="img-responsive" />
										<img src="../assets/images/19.jpg" alt=" " className="img-responsive" />
										<img src="../assets/images/17.jpg" alt=" " className="img-responsive" />
										<img src="../assets/images/18.jpg" alt=" " className="img-responsive" />
										<div className="w3_hs_bottom">
											<ul>
												<li>
													<a href="#" data-toggle="modal" data-target="#myModal4"><span className="glyphicon glyphicon-eye-open" aria-hidden="true"></span></a>
												</li>
											</ul>
										</div>
									</div>
									<h5><a href="single.html">Coffee Maker</a></h5>
									<div className="simpleCart_shelfItem">
										<p><span>$250</span> <i className="item_price">$220</i></p>
										<form action="#" method="post">
											<input type="hidden" name="cmd" value="_cart" />
											<input type="hidden" name="add" value="1" /> 
											<input type="hidden" name="w3ls_item" value="Coffee Maker" /> 
											<input type="hidden" name="amount" value="220.00" />   
											<button type="submit" className="w3ls-cart">Add to cart</button>
										</form>
									</div>
								</div>
								<div className="clearfix"> </div>
							</div>
						</div>
					</div>
				</div> 
			</div>
    </div>
    </div>

	<div className="newsletter">
		<div className="container">
			<div className="col-md-6 w3agile_newsletter_left">
				<h3>Newsletter</h3>
				<p>Excepteur sint occaecat cupidatat non proident, sunt.</p>
			</div>
			<div className="col-md-6 w3agile_newsletter_right">
				<form action="#" method="post">
					<input type="email" name="Email" placeholder="Email" required="" />
					<input type="submit" value="" />
				</form>
			</div>
			<div className="clearfix"> </div>
		</div>
	</div>
    </div>
  );
}

export default Home;
