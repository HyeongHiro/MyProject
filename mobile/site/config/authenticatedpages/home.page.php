<?
    Response::getInstance()->setPageTitle('Home');
?>
<div class="grid_24">
    <h1>Welcome <?php echo Session::getInstance()->getAuthenticationManager()->getUser()->getFirstname(); ?> </h1> 
</div>