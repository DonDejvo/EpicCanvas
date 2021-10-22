const vsTextureLight=`
attribute highp vec4 aVertexNormal;
attribute highp vec4 aVertexPosition;
attribute highp vec2 aTextureCoord;

uniform highp mat4 uNormalMatrix;
uniform highp mat4 uModelViewMatrix;
uniform highp mat4 uProjectionMatrix;

uniform highp vec3 pointLightColor;
uniform highp vec3 pointLightPosition;
uniform highp vec3 ambientLight;
uniform highp vec3 directionalLightColor;
uniform highp vec3 directionalVector;

varying highp vec2 vTextureCoord;
varying highp vec3 vLighting;

void main(void){
    vec4 vertexPosition = uModelViewMatrix * aVertexPosition;
    
    gl_Position = uProjectionMatrix * vertexPosition;

    vTextureCoord = aTextureCoord;

    highp vec4 transformedNormal = uNormalMatrix * aVertexNormal;

    highp float directionalLightIntensity = max(dot(transformedNormal.xyz, directionalVector),0.0);

    highp vec3 pointLightDirection = normalize(pointLightPosition - vertexPosition.xyz);

    highp float pointLightIntensity = max(dot(transformedNormal.xyz, pointLightDirection),0.0);

    vLighting = ambientLight + (directionalLightColor * directionalLightIntensity) + (pointLightColor * pointLightIntensity);

}`
