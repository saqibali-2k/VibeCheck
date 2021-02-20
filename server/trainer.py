import tensorflow as tf
from tensorflow.keras.regularizers import l2

class ModelWrapper:
    def __init__(self):
        inputs = tf.keras.layers.Input(shape=(48, 48, 3))
        x = tf.keras.layers.experimental.preprocessing.Rescaling(1./255)(inputs)
        x = tf.keras.layers.Conv2D(64, 3, padding="same", kernel_regularizer=l2(0.001))(x)
        x = self._res_block(x)
        x = tf.keras.layers.Flatten()(x)
        x = tf.keras.layers.Dense(64, kernel_regularizer=l2(0.001), activation='relu')(x)
        outputs = tf.keras.layers.Dense(7)(x)
        self.model = tf.keras.Model(inputs, outputs)
        print(self.model.summary())

    @staticmethod
    def _res_block(inputs):
        x = tf.keras.layers.Conv2D(32, 3, padding="same", kernel_regularizer=l2(0.001), activation="relu")(inputs)
        x = tf.keras.layers.Conv2D(64, 3, padding="same", kernel_regularizer=l2(0.001))(x)
        x = x + inputs  # skip-connection
        x = tf.keras.activations.relu(x)
        return x

    def train_model(self, train, validation, test):
        self.model.compile(optimizer='adam', loss=tf.keras.losses.SparseCategoricalCrossentropy(from_logits=True),
                           metrics=['accuracy'])
        self.model.fit(train, validation_data=validation, epochs=13)
        self.model.evaluate(test, verbose=2)

    def save(self):
        self.model.save("./model_save.h5")

if __name__ == "__main__":
    train_ds = tf.keras.preprocessing.image_dataset_from_directory(
      "./data/train",
      seed=123,
      image_size=(48, 48),
      batch_size=32)

    test_ds = tf.keras.preprocessing.image_dataset_from_directory(
      "./data/validation",
      seed=123,
      image_size=(48, 48),
      batch_size=32)

    # nnet = ModelWrapper()
    # nnet.train_model(train_ds, None, test_ds)
    # nnet.save()

    model = tf.keras.applications.VGG16(
    include_top=False, weights=None, input_tensor=None,
    input_shape=(48, 48, 3), pooling='max', classes=7,
    classifier_activation='softmax')


    model.compile(optimizer=tf.keras.optimizers.Adam(1e-4), loss=tf.keras.losses.SparseCategoricalCrossentropy(from_logits=True),
                       metrics=['accuracy'])
    model.fit(train_ds, epochs=20)
    model.evaluate(test_ds, verbose=2)
    model.save("./vgg16.h5")