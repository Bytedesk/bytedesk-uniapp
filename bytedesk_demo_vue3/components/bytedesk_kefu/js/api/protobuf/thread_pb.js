// source: thread.proto
/**
 * @fileoverview
 * @enhanceable
 * @suppress {missingRequire} reports error on implicit type usages.
 * @suppress {messageConventions} JS Compiler reports an error if a variable or
 *     field starts with 'MSG_' and isn't a translatable message.
 * @public
 */
// GENERATED CODE -- DO NOT EDIT!
/* eslint-disable */
// @ts-nocheck
import * as jspb from 'google-protobuf';
var goog = jspb;
var global = (function() {
  if (this) { return this; }
  if (typeof window !== 'undefined') { return window; }
  if (typeof global !== 'undefined') { return global; }
  if (typeof self !== 'undefined') { return self; }
  return Function('return this')();
}.call(null));

goog.exportSymbol('proto.Thread', null, global);
goog.exportSymbol('proto.ThreadList', null, global);
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.Thread = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.Thread, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.Thread.displayName = 'proto.Thread';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.ThreadList = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.ThreadList.repeatedFields_, null);
};
goog.inherits(proto.ThreadList, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.ThreadList.displayName = 'proto.ThreadList';
}



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.Thread.prototype.toObject = function(opt_includeInstance) {
  return proto.Thread.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.Thread} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.Thread.toObject = function(includeInstance, msg) {
  var f, obj = {
    tid: jspb.Message.getFieldWithDefault(msg, 1, ""),
    type: jspb.Message.getFieldWithDefault(msg, 2, ""),
    client: jspb.Message.getFieldWithDefault(msg, 5, ""),
    nickname: jspb.Message.getFieldWithDefault(msg, 6, ""),
    avatar: jspb.Message.getFieldWithDefault(msg, 7, ""),
    content: jspb.Message.getFieldWithDefault(msg, 8, ""),
    timestamp: jspb.Message.getFieldWithDefault(msg, 9, ""),
    unreadcount: jspb.Message.getFieldWithDefault(msg, 10, 0),
    topic: jspb.Message.getFieldWithDefault(msg, 11, ""),
    extra: jspb.Message.getFieldWithDefault(msg, 20, "")
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.Thread}
 */
proto.Thread.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.Thread;
  return proto.Thread.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.Thread} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.Thread}
 */
proto.Thread.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setTid(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setType(value);
      break;
    case 5:
      var value = /** @type {string} */ (reader.readString());
      msg.setClient(value);
      break;
    case 6:
      var value = /** @type {string} */ (reader.readString());
      msg.setNickname(value);
      break;
    case 7:
      var value = /** @type {string} */ (reader.readString());
      msg.setAvatar(value);
      break;
    case 8:
      var value = /** @type {string} */ (reader.readString());
      msg.setContent(value);
      break;
    case 9:
      var value = /** @type {string} */ (reader.readString());
      msg.setTimestamp(value);
      break;
    case 10:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setUnreadcount(value);
      break;
    case 11:
      var value = /** @type {string} */ (reader.readString());
      msg.setTopic(value);
      break;
    case 20:
      var value = /** @type {string} */ (reader.readString());
      msg.setExtra(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.Thread.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.Thread.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.Thread} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.Thread.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getTid();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getType();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
  f = message.getClient();
  if (f.length > 0) {
    writer.writeString(
      5,
      f
    );
  }
  f = message.getNickname();
  if (f.length > 0) {
    writer.writeString(
      6,
      f
    );
  }
  f = message.getAvatar();
  if (f.length > 0) {
    writer.writeString(
      7,
      f
    );
  }
  f = message.getContent();
  if (f.length > 0) {
    writer.writeString(
      8,
      f
    );
  }
  f = message.getTimestamp();
  if (f.length > 0) {
    writer.writeString(
      9,
      f
    );
  }
  f = message.getUnreadcount();
  if (f !== 0) {
    writer.writeInt32(
      10,
      f
    );
  }
  f = message.getTopic();
  if (f.length > 0) {
    writer.writeString(
      11,
      f
    );
  }
  f = message.getExtra();
  if (f.length > 0) {
    writer.writeString(
      20,
      f
    );
  }
};


/**
 * optional string tid = 1;
 * @return {string}
 */
proto.Thread.prototype.getTid = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.Thread} returns this
 */
proto.Thread.prototype.setTid = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional string type = 2;
 * @return {string}
 */
proto.Thread.prototype.getType = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.Thread} returns this
 */
proto.Thread.prototype.setType = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};


/**
 * optional string client = 5;
 * @return {string}
 */
proto.Thread.prototype.getClient = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 5, ""));
};


/**
 * @param {string} value
 * @return {!proto.Thread} returns this
 */
proto.Thread.prototype.setClient = function(value) {
  return jspb.Message.setProto3StringField(this, 5, value);
};


/**
 * optional string nickname = 6;
 * @return {string}
 */
proto.Thread.prototype.getNickname = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 6, ""));
};


/**
 * @param {string} value
 * @return {!proto.Thread} returns this
 */
proto.Thread.prototype.setNickname = function(value) {
  return jspb.Message.setProto3StringField(this, 6, value);
};


/**
 * optional string avatar = 7;
 * @return {string}
 */
proto.Thread.prototype.getAvatar = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 7, ""));
};


/**
 * @param {string} value
 * @return {!proto.Thread} returns this
 */
proto.Thread.prototype.setAvatar = function(value) {
  return jspb.Message.setProto3StringField(this, 7, value);
};


/**
 * optional string content = 8;
 * @return {string}
 */
proto.Thread.prototype.getContent = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 8, ""));
};


/**
 * @param {string} value
 * @return {!proto.Thread} returns this
 */
proto.Thread.prototype.setContent = function(value) {
  return jspb.Message.setProto3StringField(this, 8, value);
};


/**
 * optional string timestamp = 9;
 * @return {string}
 */
proto.Thread.prototype.getTimestamp = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 9, ""));
};


/**
 * @param {string} value
 * @return {!proto.Thread} returns this
 */
proto.Thread.prototype.setTimestamp = function(value) {
  return jspb.Message.setProto3StringField(this, 9, value);
};


/**
 * optional int32 unreadCount = 10;
 * @return {number}
 */
proto.Thread.prototype.getUnreadcount = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 10, 0));
};


/**
 * @param {number} value
 * @return {!proto.Thread} returns this
 */
proto.Thread.prototype.setUnreadcount = function(value) {
  return jspb.Message.setProto3IntField(this, 10, value);
};


/**
 * optional string topic = 11;
 * @return {string}
 */
proto.Thread.prototype.getTopic = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 11, ""));
};


/**
 * @param {string} value
 * @return {!proto.Thread} returns this
 */
proto.Thread.prototype.setTopic = function(value) {
  return jspb.Message.setProto3StringField(this, 11, value);
};


/**
 * optional string extra = 20;
 * @return {string}
 */
proto.Thread.prototype.getExtra = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 20, ""));
};


/**
 * @param {string} value
 * @return {!proto.Thread} returns this
 */
proto.Thread.prototype.setExtra = function(value) {
  return jspb.Message.setProto3StringField(this, 20, value);
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.ThreadList.repeatedFields_ = [1];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.ThreadList.prototype.toObject = function(opt_includeInstance) {
  return proto.ThreadList.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.ThreadList} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.ThreadList.toObject = function(includeInstance, msg) {
  var f, obj = {
    listList: jspb.Message.toObjectList(msg.getListList(),
    proto.Thread.toObject, includeInstance)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.ThreadList}
 */
proto.ThreadList.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.ThreadList;
  return proto.ThreadList.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.ThreadList} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.ThreadList}
 */
proto.ThreadList.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new proto.Thread;
      reader.readMessage(value,proto.Thread.deserializeBinaryFromReader);
      msg.addList(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.ThreadList.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.ThreadList.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.ThreadList} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.ThreadList.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getListList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      1,
      f,
      proto.Thread.serializeBinaryToWriter
    );
  }
};


/**
 * repeated Thread list = 1;
 * @return {!Array<!proto.Thread>}
 */
proto.ThreadList.prototype.getListList = function() {
  return /** @type{!Array<!proto.Thread>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.Thread, 1));
};


/**
 * @param {!Array<!proto.Thread>} value
 * @return {!proto.ThreadList} returns this
*/
proto.ThreadList.prototype.setListList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 1, value);
};


/**
 * @param {!proto.Thread=} opt_value
 * @param {number=} opt_index
 * @return {!proto.Thread}
 */
proto.ThreadList.prototype.addList = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 1, opt_value, proto.Thread, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.ThreadList} returns this
 */
proto.ThreadList.prototype.clearListList = function() {
  return this.setListList([]);
};


export default proto