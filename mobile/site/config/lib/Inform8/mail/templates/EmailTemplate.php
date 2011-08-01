<?php

/**
 * Retrieves a template.
 * @author ryanhenderson
 *
 */
interface EmailTemplate {

	public function getSubjectTemplate();
	public function getTextTemplate();
	public function getHtmlTemplate();

	/**
	 * @return array key to value map of variables and their associated values.
	 */
	public function getVariables();
	
	/**
	 * Get the list of files to embedd along with this template.
	 * For example logos and css.
	 * This method returns the key and the feilname as a string.
	 * The KEY is the CID refrence. The filename must be loaded into the email as per emailer requirements.
	 *  
	 * @return array with key to file name map. 
	 */
	public function getEmbeddableFiles();
	
	/**
	 * Get the list of files to attach to the email along with this template.
	 * For example PDF files.
	 *  
	 * @return array of String filenames map. 
	 */
	public function getAttachmentFiles();
}


?>