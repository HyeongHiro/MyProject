<?php 
  if (Session::getInstance()->getAuthenticationManager()->isAuthenticated()) {
    header( 'Location: /' );
    die();    
  }
  Response::getInstance()->setPageTitle('Login');
?>
<div class="grid_11">
	<table id="login-login-table">
    <?php if (Session::getInstance()->getAuthenticationManager()->getAuthenticationError() != NULL) { ?>
      <tr>
        <td>	
          <div>
            <div style="float:left">
              <img src="images/icons/warning_48.png" height="32" style="padding-top: 6px;" />
            </div>
            <div style="float:left; padding-left:10px;" id="errorMessage">
              <h3>Unable to login</h3>
  					<?php echo Session::getInstance()->getAuthenticationManager()->getAuthenticationError()->getDisplayString(); ?>
  			</div>
  					<br style="clear:left;">
          </div>
          <br>
  			</td>
  		</tr>
		<?php } ?>
			<tr>
				<td>
          <h3>Existing Customers</h3>
          <div class="softGreyLineSplitter"></div>
          <form name="loginform" method="POST">
            <input type="hidden" name="login" value="1">
            <input type="hidden" name="postcmd" value="<?php echo Request::getSafeGetorPost('postcmd'); ?>">
            <table id="login-login-table" style="margin:0 auto; margin-top:10px; padding: 25px;">
              <tr>
                <td class="data" class="loginLabel" width="80">Email</td><td><input id="login-username" type="text" name="Username" size="20" class="inputText"></td>
              </tr>
              <tr><td colspan="2" height="8" class="loginHeading"></td></tr>		
              <tr>	
                <td class="data" class="loginLabel">Password</td><td><input id="login-password" type="password" name="Password" size="20" class="inputText"></td>
              </tr>
              <tr><td colspan="2" height="8" class="loginHeading"></td></tr>				
              <tr>
                <td>&nbsp;</td><td align="right">
									<input class="send" type="submit" value="Login" />
								</td>
              </tr>
            </table>
          </form>
				</td>
      </tr>
      <tr>
      	<td>
      		<br><br>
      		Forgot your password?
      		Click here to <a href="/pwretrieval.htm">reset</a>.
      	</td>
      </tr>
    </table>
</div> 
<div class="grid_2">
	&nbsp;
</div>
<div class="grid_11">
</div>
<div class="clear"></div>    
