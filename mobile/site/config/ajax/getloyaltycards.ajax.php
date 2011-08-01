<?php
$getCards = new LoyaltyCardsRetriever();
$encoder = new GetLoyaltyCardsResultJSONEncoder();
echo json_encode($encoder->toJSON($getCards->get()));