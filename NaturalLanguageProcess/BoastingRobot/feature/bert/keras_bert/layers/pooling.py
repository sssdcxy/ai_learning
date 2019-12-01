# -*- coding: utf-8 -*-
# @time       : 15/11/2019 10:29 上午
# @author     : ssdcxy
# @email      : 18379190862@163.com
# @file       : pooling
# @description: 


from feature.bert.keras_bert.backend import keras
from feature.bert.keras_bert.backend import backend as K


class MaskedGlobalMaxPool1D(keras.layers.Layer):

    def __init__(self, **kwargs):
        super(MaskedGlobalMaxPool1D, self).__init__(**kwargs)
        self.supports_masking = True

    def compute_mask(self, inputs, mask=None):
        return None

    def compute_output_shape(self, input_shape):
        return input_shape[:-2] + (input_shape[-1],)

    def call(self, inputs, mask=None):
        if mask is not None:
            mask = K.cast(mask, K.floatx())
            inputs -= K.expand_dims((1.0 - mask) * 1e6, axis=-1)
        return K.max(inputs, axis=-2)
