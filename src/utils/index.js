export function extend( target, options ) {
    var prop, extended = {};
    for ( prop in target ) {
        if ( Object.prototype.hasOwnProperty.call( target, prop ) ) {
            extended[ prop ] = target[ prop ];
        }
    }
    for ( prop in options ) {
        if ( Object.prototype.hasOwnProperty.call( options, prop ) ) {
            extended[ prop ] = options[ prop ];
        }
    }
    return extended;
};