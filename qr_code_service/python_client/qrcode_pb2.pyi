from google.protobuf import descriptor as _descriptor
from google.protobuf import message as _message
from typing import ClassVar as _ClassVar, Optional as _Optional

DESCRIPTOR: _descriptor.FileDescriptor

class QrCodeRequest(_message.Message):
    __slots__ = ("content", "size")
    CONTENT_FIELD_NUMBER: _ClassVar[int]
    SIZE_FIELD_NUMBER: _ClassVar[int]
    content: str
    size: int
    def __init__(self, content: _Optional[str] = ..., size: _Optional[int] = ...) -> None: ...

class QrCodeResponse(_message.Message):
    __slots__ = ("image_data",)
    IMAGE_DATA_FIELD_NUMBER: _ClassVar[int]
    image_data: bytes
    def __init__(self, image_data: _Optional[bytes] = ...) -> None: ...
