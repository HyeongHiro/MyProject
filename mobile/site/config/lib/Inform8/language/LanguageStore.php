<?php 
/* Copyright 2011 - 88 Creative Pty Ltd. 
 * Copyright of this program is the property of 88 Creative, 
 * without whose written permission reproduction in
 * whole or in part is prohibited. All rights reserved.
 * http://www.inform8.com
 * http://www.88creative.com.au
 */
?><?php 
	class LanguageStore {	

		var $lang;
		
		function LanguageStore($langFile) {
			$this->lang = $langFile;
		}
		
		function get($name) {
			if (!isset($this->lang[$name]) || $this->lang[$name] == NULL || $this->lang[$name] == '') {
				return $name;
			}else {
				return $this->lang[$name];
			}
		}
	
	}
?>