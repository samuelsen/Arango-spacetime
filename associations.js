GR_NEAR      = 1 // approx like
GR_FOLLOWS   = 2 // i.e. influenced by
GR_CONTAINS  = 3 
GR_EXPRESSES = 4 //represents, etc
GR_CONTEXT   = 5 // approx like
ALL_CONTEXTS = "any"

module.exports = { 
    association : {
    "a_contains" :     [GR_CONTAINS,"contains","belongs to or is part of"],
    "a_generalizes" :  [GR_CONTAINS,"generalizes","is a special case of"],
    "a_origin" :       [GR_FOLLOWS,"may originate from","may be the source or origin of"],
    "a_providedby" :   [GR_FOLLOWS,"may be provided by","may provide"],
    "a_maintainedby" : [GR_FOLLOWS,"is maintained by","maintains"],
    "a_depends" :      [GR_FOLLOWS,"depends on","partly determines"],
    "a_caused_by" :    [GR_FOLLOWS,"may be caused by","can cause"],
    "a_uses" :         [GR_FOLLOWS,"may use","may be used by"],
    "a_name" :         [GR_EXPRESSES,"is called","is a name for"],
    "a_hasattr" :      [GR_EXPRESSES,"expresses an attribute","is an attribute of"],
    "a_promises" :     [GR_EXPRESSES,"promises","is promised by"],
    "a_hasinstance" :  [GR_EXPRESSES,"has an instance or particular case","is a particular case of"],
    "a_hasvalue" :     [GR_EXPRESSES,"has value or state","is the state or value of"],
    "a_hasarg" :       [GR_EXPRESSES,"has argument or parameter","is a parameter or argument of"],
    "a_hasrole" :      [GR_EXPRESSES,"has the role of","is a role fulfilled by"],
    "a_hasoutcome" :   [GR_EXPRESSES,"has the outcome","is the outcome of"],
    "a_hasfunction" :  [GR_EXPRESSES,"has function","is the function of"],
    "a_hasconstraint" :[GR_EXPRESSES,"has constraint","constrains"],
    "a_interpreted" :  [GR_EXPRESSES,"has interpretation","is interpreted from"],
    "a_concurrent" :   [GR_NEAR,"seen concurrently with","seen concurrently with"],
    "a_alias" :        [GR_NEAR,"also known as","also known as"],
    "a_approx" :       [GR_NEAR,"is approximately","is approximately"],
    "a_related_to" :   [GR_NEAR,"may be related to","may be related to"],
    "a_ass_dim" :      [0, "NULL", "NULL"],
    },
     menu : {
    1   :   "a_contains",
    2   :   "a_generalizes",
    3   :   "a_origin",
    4   :   "a_providedby",
    5   :   "a_maintainedby",
    6   :   "a_depends",
    7   :   "a_caused_by",
    8   :   "a_uses",
    9   :   "a_name",     
    10  :   "a_hasattr",
    11  :   "a_promises", 
    12  :   "a_hasinstance",
    13  :   "a_hasvalue",
    14  :   "a_hasarg",
    15  :   "a_hasrole",
    16  :   "a_hasoutcome",
    17  :   "a_hasfunction",
    18  :   "a_hasconstrai",
    19  :   "a_interpreted",
    20  :   "a_concurrent",
    21  :   "a_alias",
    22  :   "a_approx", 
    23  :   "a_related_to",
    24  :   "a_ass_dim",
    }
};