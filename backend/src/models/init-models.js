var DataTypes = require("sequelize").DataTypes;
var _account = require("./account");
var _achievement = require("./achievement");
var _bg_item_template = require("./bg_item_template");
var _caption = require("./caption");
var _clan_sv1 = require("./clan_sv1");
var _clan_sv2 = require("./clan_sv2");
var _clan_task_template = require("./clan_task_template");
var _dhvt_template = require("./dhvt_template");
var _flag_bag = require("./flag_bag");
var _giftcode = require("./giftcode");
var _head_avatar = require("./head_avatar");
var _history_event = require("./history_event");
var _history_gold = require("./history_gold");
var _history_receive_goldbar = require("./history_receive_goldbar");
var _history_transaction = require("./history_transaction");
var _img_by_name = require("./img_by_name");
var _intrinsic = require("./intrinsic");
var _item_option_template = require("./item_option_template");
var _item_shop = require("./item_shop");
var _item_shop_option = require("./item_shop_option");
var _item_template = require("./item_template");
var _map_template = require("./map_template");
var _mob_template = require("./mob_template");
var _nclass = require("./nclass");
var _npc_template = require("./npc_template");
var _part = require("./part");
var _player = require("./player");
var _radar = require("./radar");
var _shop = require("./shop");
var _shop_ky_gui = require("./shop_ky_gui");
var _side_task_template = require("./side_task_template");
var _skill_template = require("./skill_template");
var _small_version = require("./small_version");
var _tab_shop = require("./tab_shop");
var _task_main_template = require("./task_main_template");
var _task_sub_template = require("./task_sub_template");
var _type_item = require("./type_item");
var _type_map = require("./type_map");
var _type_sell_item_shop = require("./type_sell_item_shop");

function initModels(sequelize) {
  var account = _account(sequelize, DataTypes);
  var achievement = _achievement(sequelize, DataTypes);
  var bg_item_template = _bg_item_template(sequelize, DataTypes);
  var caption = _caption(sequelize, DataTypes);
  var clan_sv1 = _clan_sv1(sequelize, DataTypes);
  var clan_sv2 = _clan_sv2(sequelize, DataTypes);
  var clan_task_template = _clan_task_template(sequelize, DataTypes);
  var dhvt_template = _dhvt_template(sequelize, DataTypes);
  var flag_bag = _flag_bag(sequelize, DataTypes);
  var giftcode = _giftcode(sequelize, DataTypes);
  var head_avatar = _head_avatar(sequelize, DataTypes);
  var history_event = _history_event(sequelize, DataTypes);
  var history_gold = _history_gold(sequelize, DataTypes);
  var history_receive_goldbar = _history_receive_goldbar(sequelize, DataTypes);
  var history_transaction = _history_transaction(sequelize, DataTypes);
  var img_by_name = _img_by_name(sequelize, DataTypes);
  var intrinsic = _intrinsic(sequelize, DataTypes);
  var item_option_template = _item_option_template(sequelize, DataTypes);
  var item_shop = _item_shop(sequelize, DataTypes);
  var item_shop_option = _item_shop_option(sequelize, DataTypes);
  var item_template = _item_template(sequelize, DataTypes);
  var map_template = _map_template(sequelize, DataTypes);
  var mob_template = _mob_template(sequelize, DataTypes);
  var nclass = _nclass(sequelize, DataTypes);
  var npc_template = _npc_template(sequelize, DataTypes);
  var part = _part(sequelize, DataTypes);
  var player = _player(sequelize, DataTypes);
  var radar = _radar(sequelize, DataTypes);
  var shop = _shop(sequelize, DataTypes);
  var shop_ky_gui = _shop_ky_gui(sequelize, DataTypes);
  var side_task_template = _side_task_template(sequelize, DataTypes);
  var skill_template = _skill_template(sequelize, DataTypes);
  var small_version = _small_version(sequelize, DataTypes);
  var tab_shop = _tab_shop(sequelize, DataTypes);
  var task_main_template = _task_main_template(sequelize, DataTypes);
  var task_sub_template = _task_sub_template(sequelize, DataTypes);
  var type_item = _type_item(sequelize, DataTypes);
  var type_map = _type_map(sequelize, DataTypes);
  var type_sell_item_shop = _type_sell_item_shop(sequelize, DataTypes);

  item_shop_option.belongsTo(item_option_template, { as: "option", foreignKey: "option_id"});
  item_option_template.hasMany(item_shop_option, { as: "item_shop_options", foreignKey: "option_id"});
  item_shop_option.belongsTo(item_shop, { as: "item_shop", foreignKey: "item_shop_id"});
  item_shop.hasMany(item_shop_option, { as: "item_shop_options", foreignKey: "item_shop_id"});
  skill_template.belongsTo(nclass, { as: "nclass", foreignKey: "nclass_id"});
  nclass.hasMany(skill_template, { as: "skill_templates", foreignKey: "nclass_id"});
  shop.belongsTo(npc_template, { as: "npc", foreignKey: "npc_id"});
  npc_template.hasMany(shop, { as: "shops", foreignKey: "npc_id"});

  return {
    account,
    achievement,
    bg_item_template,
    caption,
    clan_sv1,
    clan_sv2,
    clan_task_template,
    dhvt_template,
    flag_bag,
    giftcode,
    head_avatar,
    history_event,
    history_gold,
    history_receive_goldbar,
    history_transaction,
    img_by_name,
    intrinsic,
    item_option_template,
    item_shop,
    item_shop_option,
    item_template,
    map_template,
    mob_template,
    nclass,
    npc_template,
    part,
    player,
    radar,
    shop,
    shop_ky_gui,
    side_task_template,
    skill_template,
    small_version,
    tab_shop,
    task_main_template,
    task_sub_template,
    type_item,
    type_map,
    type_sell_item_shop,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
