export class CompareUtils {
  static getChangedFieldsAndValue = (
    before: Record<string, unknown> = {},
    after: Record<string, unknown> = {}
  ): any[] => {
    const result: any[] = [];
    Object.entries(before).forEach(([key, value]) => {
      // when key exist in next obj
      if (key in after) {
        // save changes only when values updated
        if (value !== after[key]) {
          result.push([key, value, after[key]]);
        }
      } else {
        result.push([key, value, undefined]);
      }
    });

    return result;
  };
}
