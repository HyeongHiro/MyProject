// plug European currency renderer into formatter
Ext.util.Format.Currency = function(v)
{
  v = (Math.round((v-0)*100))/100;
  v = (v == Math.floor(v)) ? v + ".00" : ((v*10 == Math.floor(v*10)) ? v + "0" : v);
  return ('$' + v);
};