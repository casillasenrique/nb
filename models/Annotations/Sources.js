const source = (sequelize, DataTypes) => {
  const Source = sequelize.define('source', {
    id:{
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      primaryKey: true
    },
    filepath:{
      type: DataTypes.STRING, //url if html
      unique: true,
      allowNull: true
    },
    filename:{
      type: DataTypes.STRING, 
      allowNull: false
    },
    filetype:{
      type: DataTypes.ENUM,
      values: ['html', 'pdf', 'image', 'video'],
      defaultValue: 'html'
    },
    origin:{
      type: DataTypes.STRING,
    }
  },
  {
    classMethods:{
      associate: (models) =>{
        Source.hasMany(models.Location, {as: 'Locations', foreignKey: {name: 'source_id', allowNull: false}, onDelete: 'CASCADE'});
        Source.belongsTo(models.Class, {as: 'Class', foreignKey: {name: 'class_id', allowNull: false}, onDelete: 'CASCADE'});
      }
    },
    hooks:{
      beforeCreate: setOrigin,
      beforeUpdate: setOrigin
    }
  });
  return Source;
};

function setOrigin(source){
  if(source.filetype == 'html'){
    source.origin = new URL(source.filepath).origin;
  }
}

module.exports = source;