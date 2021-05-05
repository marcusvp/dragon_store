function applyAssociations(sequelize) {
  const {
    address,
    cart,
    cartItem,
    item,
    order,
    user,
    paymentResult,
  } = sequelize.models;
  const associate = true;
  if (associate) {
    user.hasOne(address);
    user.hasMany(cart);
    user.hasMany(order);
    address.belongsTo(user);
    address.hasMany(order);
    order.belongsTo(user);
    order.belongsTo(cart);
    order.belongsTo(address);
    order.hasOne(paymentResult, { foreignKey: { unique: true } });
    cartItem.belongsTo(cart);
    cartItem.belongsTo(item);
    item.hasMany(cartItem);
    cart.hasMany(cartItem);
    cart.belongsTo(user);
    paymentResult.belongsTo(order);
  }
}

module.exports = { applyAssociations };
