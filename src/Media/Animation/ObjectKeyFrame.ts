/// <reference path="KeyFrame.ts" />

module Fayde.Media.Animation {
    export class ObjectKeyFrame extends KeyFrame {
        static ValueProperty: DependencyProperty = DependencyProperty.Register("Value", () => Object, ObjectKeyFrame);
        Value: any;
        ConvertedValue: any = undefined;
    }
    Fayde.RegisterType(ObjectKeyFrame, Fayde.XMLNS);
    
    export class DiscreteObjectKeyFrame extends ObjectKeyFrame {
        InterpolateValue(baseValue: any, keyFrameProgress: number): any {
            if (keyFrameProgress >= 1.0)
                return this.ConvertedValue;
            return baseValue;
        }
    }
    Fayde.RegisterType(DiscreteObjectKeyFrame, Fayde.XMLNS);
}